const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// GET /api/achievements/:userId - Get achievements for a user
router.get('/:userId', async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.params.userId });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
