const mongoose = require('mongoose');

const MarketplaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerName: { type: String, required: true },
  type: { type: String, enum: ['Lending', 'Selling', 'Swapping'], required: true },
  category: { type: String, required: true },
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Marketplace', MarketplaceSchema, 'marketplace');
