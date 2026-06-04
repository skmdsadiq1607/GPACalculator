const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  branch: { type: String, required: false },
  branchName: { type: String, required: false },
  semesterName: { type: String, required: false },
  sgpa: { type: Number, default: 0 },
  cgpa: { type: Number, default: 0 },
  courses: { type: Array, default: [] },
  ipAddress: { type: String, default: null }, // Optional, useful for rate limiting or seeing unique likes
  likedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);
