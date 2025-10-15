const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug environment variables
console.log('🔍 Environment Variables Debug:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('Please check your MongoDB Atlas connection string and network access settings');
    console.log('Full error:', err);
  });

// Import routes
const marketplaceRoutes = require('./routes/marketplace');
const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const achievementsRoutes = require('./routes/achievements');
const notificationsRoutes = require('./routes/notifications');

// Use routes
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/notifications', notificationsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SAHA Backend is running!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Network access: http://172.18.0.42:${PORT}/api/health`);
});
