const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, branch, year, bio, skills } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Create new user with default values
    const newUser = new User({
      name,
      email,
      password, // Store password (plain text for now)
      branch,
      year,
      bio: bio || '',
      skills: skills || [],
      xp: 0,
      level: 1
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/users/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check password (plain text for now - temporary)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/me - Get current user (for demo, returns most recent user)
router.get('/me', async (req, res) => {
  try {
    // For demo purposes, return the most recently created user
    // In production, implement proper authentication
    const user = await User.findOne().sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/users/me - Update current user
router.put('/me', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    
    if (!_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    Object.assign(user, updateData);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
