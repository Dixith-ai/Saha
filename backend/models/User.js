const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return this.isNew; } }, // Only required for new users
  branch: String,
  year: String,
  bio: String,
  skills: [String],
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'users');
