const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  badgeColor: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema, 'achievements');
