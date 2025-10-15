# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

## Quick Start

1. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/saha.git
   cd saha
   npm run setup
   ```

2. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=development
   ```

3. **Start Development**
   ```bash
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Network: http://your-ip:3000

## Available Scripts

- `npm run setup` - Install all dependencies
- `npm start` - Start both frontend and backend
- `npm run dev` - Start frontend only
- `npm run start:backend` - Start backend only
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Network Access

For friends to access your application:
1. Find your IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `src/lib/api.ts` with your IP: `http://your-ip:5000`
3. Start backend with network access: `cd backend && node server.js`
4. Share: `http://your-ip:3000`

## Troubleshooting

- **Port conflicts**: Change ports in package.json and backend/server.js
- **MongoDB connection**: Check your Atlas connection string
- **Network access**: Ensure firewall allows connections on ports 3000 and 5000
