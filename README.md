# 🚀 SAHA - Student Academic Hub & Assistant

A comprehensive platform for students to collaborate, share resources, and manage academic projects. Built with modern web technologies and designed for seamless user experience.

![SAHA Logo](public/main_logo.png)

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

## 🚀 Quick Start

### **Local Development**
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start backend
cd backend && node server.js

# Start frontend (new terminal)
npm run dev
```

### **Environment Setup**
Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
```

### **Access**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

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

### **Frontend → Vercel**
1. Connect GitHub repository to Vercel
2. Set environment variable: `VITE_API_BASE_URL=https://your-backend-url.com`
3. Deploy

### **Backend → Railway/Heroku/Render**
1. Deploy backend separately
2. Get backend URL
3. Update frontend environment variable

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