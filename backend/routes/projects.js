const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('memberUserIds', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects - Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    
    // Increment XP for project creator
    const User = require('../models/User');
    if (req.body.memberUserIds && req.body.memberUserIds.length > 0) {
      const creatorId = req.body.memberUserIds[0]; // First member is usually the creator
      await User.findByIdAndUpdate(creatorId, { $inc: { xp: 10 } });
    }
    
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects/:id/join - Request to join project
router.post('/:id/join', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Create notification for join request
    const Notification = require('../models/Notification');
    const notification = new Notification({
      userId: req.body.userId,
      title: `Join request sent: ${project.title}`,
      body: `Awaiting approval for ${project.title}`,
      read: false
    });
    await notification.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
