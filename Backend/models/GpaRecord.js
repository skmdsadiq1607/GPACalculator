const mongoose = require('mongoose');

const courseResultSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  credits: { type: Number, required: true },
  grade: { type: String, default: '' },
  gradePoints: { type: Number, default: 0 },
});

const semesterResultSchema = new mongoose.Schema({
  semesterName: { type: String, required: true },
  courses: [courseResultSchema],
  sgpa: { type: Number, default: 0 },
  totalCredits: { type: Number, default: 0 },
  earnedCredits: { type: Number, default: 0 },
});

const gpaRecordSchema = new mongoose.Schema({
  studentName: { type: String, default: 'Student' },
  userId: { type: String, default: null },
  userEmail: { type: String, default: null },
  rollNumber: { type: String, default: '' },
  branch: { type: String, required: true },
  branchName: { type: String, required: true },
  academicYear: { type: String, default: '2025-26' },
  semesters: [semesterResultSchema],
  cgpa: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update updatedAt on save
gpaRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('GpaRecord', gpaRecordSchema);
