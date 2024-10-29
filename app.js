require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/Comment'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send("Thoughts on me...!!");
});

// Route to fetch all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new comment
app.post('/comments', async (req, res) => {
  const { name, message } = req.body;
  
  const newComment = new Comment({ name, message });
  
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server (only one instance)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
