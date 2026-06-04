const express = require('express');
const router = express.Router();
const GpaRecord = require('../models/GpaRecord');
const Stat = require('../models/Stat');
const { curriculum, gradingScale } = require('../data/curriculum');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '442244669533-03b8io2th50ep51jbgrpf3b0k4vup41n.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// POST /api/auth/google - verify Google token
router.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json({
      userId: payload['sub'],
      email: payload['email'],
      name: payload['name'],
      picture: payload['picture']
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

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

// GET /api/records/user/:userId - get all records for a specific user
router.get('/records/user/:userId', async (req, res) => {
  try {
    const records = await GpaRecord.find({ userId: req.params.userId }).sort({ updatedAt: -1 });
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

// GET /api/likes - get total likes
router.get('/likes', async (req, res) => {
  try {
    let stat = await Stat.findOne({ name: 'likes' });
    if (!stat) {
      stat = new Stat({ name: 'likes', count: 0 });
      await stat.save();
    }
    res.json({ count: stat.count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/likes - increment likes
router.post('/likes', async (req, res) => {
  try {
    const stat = await Stat.findOneAndUpdate(
      { name: 'likes' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json({ count: stat.count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
