const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: String,
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema, 'notifications');
