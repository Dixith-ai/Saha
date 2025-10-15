# 🚀 SAHA - Student Academic Hub & Assistant

A comprehensive platform for students to collaborate, share resources, and manage academic projects. Built with modern web technologies and designed for seamless user experience.

![SAHA Logo](images/main_logo.png)

## ✨ Features

### 🏠 **Core Functionality**
- **User Authentication**: Secure login/register system with MongoDB
- **Dashboard**: Personalized user dashboard with activity overview
- **Profile Management**: Complete user profile with skills, bio, and achievements
- **Real-time Updates**: Instant UI updates across all features

### 🛒 **Marketplace**
- **Item Listings**: Create, edit, and delete marketplace items
- **Categories**: Organize items by type (Lending, Selling, Swapping)
- **Search & Filter**: Find items quickly with search functionality
- **User Ownership**: Manage your own listings with full CRUD operations

### 🚀 **Projects**
- **Project Management**: Create and manage academic projects
- **Team Collaboration**: Add members and manage project teams
- **Skill Matching**: Find projects that match your skills
- **Project Discovery**: Browse and join interesting projects

### 👤 **Profile Features**
- **My Listings**: View and manage your marketplace items
- **My Projects**: Track your project involvement
- **Edit/Delete**: Full control over your content
- **Achievement System**: Track your progress and XP

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### **Database**
- **MongoDB Atlas** - Cloud database service
- **Collections**: Users, Marketplace, Projects, Achievements, Notifications

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/saha.git
   cd saha
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - Network Access: `http://your-ip:3000` (for friends)

## 📁 Project Structure

```
saha/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx   # Main navigation component
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts
│   │   └── UserContext.tsx # User state management
│   ├── hooks/              # Custom React hooks
│   │   ├── use-data.ts     # API data hooks
│   │   └── use-mobile.tsx  # Mobile detection hook
│   ├── lib/                # Utility libraries
│   │   ├── api.ts          # API client
│   │   ├── types.ts        # TypeScript types
│   │   └── utils.ts        # Utility functions
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── Marketplace.tsx # Marketplace page
│   │   ├── Projects.tsx    # Projects page
│   │   ├── Profile.tsx     # User profile
│   │   ├── SignIn.tsx      # Login page
│   │   └── SignUp.tsx      # Registration page
│   └── App.tsx             # Main app component
├── backend/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Backend server
├── images/                  # Static images
└── README.md
```

## 🔧 API Endpoints

### **Authentication**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile

### **Marketplace**
- `GET /api/marketplace` - Get all listings
- `POST /api/marketplace` - Create new listing
- `PUT /api/marketplace/:id` - Update listing
- `DELETE /api/marketplace/:id` - Delete listing

### **Projects**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### **Other**
- `GET /api/achievements/:userId` - Get user achievements
- `GET /api/notifications/:userId` - Get user notifications
- `GET /api/health` - Health check

## 🎨 UI/UX Features

### **Design System**
- **Modern Glass Morphism**: Beautiful glassmorphic design
- **Responsive Layout**: Works on all device sizes
- **Dark/Light Theme**: Automatic theme detection
- **Smooth Animations**: Polished user interactions
- **Accessibility**: WCAG compliant components

### **User Experience**
- **Intuitive Navigation**: Easy-to-use interface
- **Real-time Feedback**: Toast notifications for actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client and server-side validation

## 🔒 Security Features

- **Input Validation**: Server-side data validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Error Handling**: Secure error responses
- **Data Sanitization**: Clean user inputs

## 🌐 Network Configuration

The application is configured for both local and network access:

- **Local Development**: `http://localhost:3000`
- **Network Access**: `http://your-ip:3000`
- **Backend API**: `http://your-ip:5000`

Perfect for collaborative development and testing with friends!

## 📱 Mobile Responsive

- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets
- **Responsive Images**: Optimized image loading
- **Mobile Navigation**: Collapsible navigation menu

## 🚀 Deployment

### **Frontend Deployment**
- **Vercel**: Recommended for React applications
- **Netlify**: Alternative deployment option
- **GitHub Pages**: Free static hosting

### **Backend Deployment**
- **Railway**: Easy Node.js deployment
- **Heroku**: Popular platform for Node.js
- **DigitalOcean**: VPS deployment option

### **Database**
- **MongoDB Atlas**: Cloud database (already configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Custom UI/UX design
- **Backend**: Node.js + Express + MongoDB

## 🎯 Future Enhancements

- [ ] Real-time chat system
- [ ] File upload for projects
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and insights

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: [Link to docs if available]

---

**Made with ❤️ for the student community**

*SAHA - Empowering students through collaboration and resource sharing*