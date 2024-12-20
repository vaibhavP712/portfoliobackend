require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const commentsRouter = require('./routes/CRUD_Cmnt');

const app = express();

// Middleware
app.use(helmet());

app.use(cors());

app.use(morgan('combined'));

// Add middleware to parse JSON
app.use(express.json());

// Logging middleware(optional)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit process with failure
    });

mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);


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
