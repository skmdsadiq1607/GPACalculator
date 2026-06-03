const express = require('express');
const router = express.Router();
const GpaRecord = require('../models/GpaRecord');
const { curriculum, gradingScale } = require('../data/curriculum');

// GET /api/curriculum - return all curriculum data
router.get('/curriculum', (req, res) => {
  res.json({ curriculum, gradingScale });
});

// GET /api/curriculum/:branch - return specific branch
router.get('/curriculum/:branch', (req, res) => {
  const { branch } = req.params;
  if (!curriculum[branch]) {
    return res.status(404).json({ error: 'Branch not found' });
  }
  res.json({ branch: curriculum[branch], gradingScale });
});

// POST /api/records - save a new GPA record
router.post('/records', async (req, res) => {
  try {
    const record = new GpaRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/records - get all records
router.get('/records', async (req, res) => {
  try {
    const records = await GpaRecord.find().sort({ updatedAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/records/:id - get a specific record
router.get('/records/:id', async (req, res) => {
  try {
    const record = await GpaRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/records/:id - update a record
router.put('/records/:id', async (req, res) => {
  try {
    const record = await GpaRecord.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/records/:id - delete a record
router.delete('/records/:id', async (req, res) => {
  try {
    await GpaRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
