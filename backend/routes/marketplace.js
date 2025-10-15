const express = require('express');
const router = express.Router();
const Marketplace = require('../models/Marketplace');

// GET /api/marketplace - Get all listings with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    const listings = await Marketplace.find(query).populate('ownerUserId', 'name email');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/marketplace - Create new listing
router.post('/', async (req, res) => {
  try {
    const listing = new Marketplace(req.body);
    await listing.save();
    
    // Increment XP for listing creator
    const User = require('../models/User');
    if (req.body.ownerUserId) {
      await User.findByIdAndUpdate(req.body.ownerUserId, { $inc: { xp: 5 } });
    }
    
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/marketplace/:id - Update a listing
router.put('/:id', async (req, res) => {
  try {
    const listing = await Marketplace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/marketplace/:id - Delete a listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Marketplace.findByIdAndDelete(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    res.json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/marketplace/:id/request - Request a listing
router.post('/:id/request', async (req, res) => {
  try {
    const listing = await Marketplace.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    // Create notification for request
    const Notification = require('../models/Notification');
    const notification = new Notification({
      userId: req.body.userId,
      title: `Request sent for ${listing.title}`,
      body: `You requested: ${listing.title}`,
      read: false
    });
    await notification.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
