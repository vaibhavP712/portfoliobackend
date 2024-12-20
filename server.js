require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const Comment = require('./models/Comment');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const commentsRouter = require('./routes/comments');

const app = express();

// Middleware
app.use(helmet());
//const allowedOrigins = ['http://localhost:3000']; // Update with your frontend domain
// app.use(cors({
//     origin: function(origin, callback){
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }));
app.use(cors());

app.use(morgan('combined'));

// Add middleware to parse JSON
app.use(express.json());

// Logging middleware
// app.use((req, res, next) => {
//     console.log(`Request URL: ${req.url}`);
//     next();
// });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  });

mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
  // Consider reconnection logic here
});

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to my comments API!");
});

app.use('/comments', commentsRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('Mongo URI:', process.env.MONGO_URI);//remove after debug