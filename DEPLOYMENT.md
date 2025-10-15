# 🚀 Deployment Guide

## Frontend Deployment

### **Vercel (Recommended)**

1. **Connect GitHub repository**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**:
   - `VITE_API_BASE_URL`: Your backend URL

4. **Deploy**: Automatic deployment on push

### **Netlify**

1. **Connect repository**
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment variables**:
   - `VITE_API_BASE_URL`: Your backend URL

### **GitHub Pages**

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

## Backend Deployment

### **Railway**

1. **Connect GitHub repository**
2. **Add environment variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
   - `NODE_ENV`: production

3. **Deploy**: Automatic deployment

### **Heroku**

1. **Create Heroku app**
2. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### **DigitalOcean**

1. **Create droplet**
2. **Install Node.js and PM2**
3. **Clone repository**
4. **Install dependencies**
5. **Start with PM2**:
   ```bash
   pm2 start server.js --name saha-backend
   ```

## Database Setup

### **MongoDB Atlas**

1. **Create cluster**
2. **Configure network access**:
   - Add your IP address
   - Add 0.0.0.0/0 for all IPs (development only)

3. **Create database user**
4. **Get connection string**
5. **Update environment variables**

## Environment Variables

### **Frontend (.env)**
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### **Backend (.env)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saha
PORT=5000
NODE_ENV=production
```

## Domain Configuration

### **Custom Domain**
1. **Purchase domain**
2. **Configure DNS**:
   - A record pointing to your server IP
   - CNAME for www subdomain

3. **SSL Certificate**:
   - Let's Encrypt (free)
   - Cloudflare SSL

## Monitoring

### **Health Checks**
- Frontend: `https://your-domain.com`
- Backend: `https://your-backend.com/api/health`

### **Logs**
- **Vercel**: Built-in logging
- **Railway**: Built-in logging
- **Heroku**: `heroku logs --tail`

## Performance Optimization

### **Frontend**
- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable caching

### **Backend**
- Use PM2 for process management
- Enable gzip compression
- Set up caching
- Monitor memory usage

## Security

### **Production Checklist**
- [ ] Use HTTPS
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Use secure headers
- [ ] Regular security updates

## Troubleshooting

### **Common Issues**
- **CORS errors**: Check backend CORS configuration
- **Database connection**: Verify MongoDB Atlas settings
- **Build failures**: Check Node.js version compatibility
- **Environment variables**: Ensure all required variables are set

### **Debug Commands**
```bash
# Check backend health
curl https://your-backend.com/api/health

# Check frontend build
npm run build

# Check environment variables
echo $MONGODB_URI
```
