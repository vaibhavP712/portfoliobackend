// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true,trim: true,
    maxlength: 20},
  message: { type: String, required: true,trim: true,
    maxlength: 500 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);