require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const app = express();

app.use(express.json()); // for parsing JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json({ message: 'Comments will be here!' });
});

app.post('/comments', async (req, res) => {
    const newComment = new Comment({ content: req.body.content });
    await newComment.save();
    res.status(201).json(newComment);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
