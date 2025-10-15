const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  memberUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxMembers: { type: Number, required: true },
  skills: [String],
  icon: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema, 'projects');
