const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login - Log a user sign-in event
router.post('/login', async (req, res) => {
  try {
    const { userId, name, email, picture } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ error: 'userId and email are required' });
    }

    // Upsert the user: create if they don't exist, update lastLogin if they do.
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $set: { name, email, picture },
        $currentDate: { lastLogin: true }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Login recorded', user });
  } catch (error) {
    console.error('Error logging user in:', error);
    res.status(500).json({ error: 'Server error tracking login' });
  }
});

module.exports = router;
