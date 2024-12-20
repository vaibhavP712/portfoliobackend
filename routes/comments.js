// routes/comments.js

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ message: 'Failed to retrieve comments' });
    }
});

// POST a new comment with validation
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('message').notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { name, message } = req.body;
        const newComment = new Comment({ name, message });
        try {
            const savedComment = await newComment.save();
            res.status(201).json(savedComment);
        } catch (err) {
            console.error("Error saving comment:", err);
            res.status(500).json({ message: 'Failed to save comment' });
        }
    }
);

module.exports = router;