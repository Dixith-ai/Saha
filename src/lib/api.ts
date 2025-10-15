import { Achievement, AppNotification, MarketplaceListing, Project, UserProfile, MongoId } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://172.18.0.42:5000';

// Helper function to get current user ID from context
let currentUserId: MongoId | null = null;

export const setCurrentUserId = (userId: MongoId | null) => {
  currentUserId = userId;
};

export const getCurrentUserId = (): MongoId => {
  if (!currentUserId) {
    throw new Error('User not authenticated');
  }
  return currentUserId;
};

const api = {
  // Marketplace
  async listMarketplace(query?: { search?: string; category?: string }) {
    const params = new URLSearchParams();
    if (query?.search) params.append('search', query.search);
    if (query?.category) params.append('category', query.category);
    
    const response = await fetch(`${API_BASE_URL}/api/marketplace?${params}`);
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
  },

  async createListing(input: Omit<MarketplaceListing, "_id" | "createdAt" | "updatedAt">) {
    const response = await fetch(`${API_BASE_URL}/api/marketplace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error('Failed to create listing');
    return response.json();
  },

  async updateListing(listingId: MongoId, data: Partial<MarketplaceListing>) {
    const response = await fetch(`${API_BASE_URL}/api/marketplace/${listingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update listing');
    return response.json();
  },

  async deleteListing(listingId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/marketplace/${listingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete listing');
    return response.json();
  },

  async requestListing(listingId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/marketplace/${listingId}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: getCurrentUserId() })
    });
    if (!response.ok) throw new Error('Failed to request listing');
    return response.json();
  },

  // Projects
  async listProjects() {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async createProject(input: Omit<Project, "_id" | "createdAt" | "updatedAt">) {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  async updateProject(projectId: MongoId, data: Partial<Project>) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  async deleteProject(projectId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },

  async requestJoinProject(projectId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: getCurrentUserId() })
    });
    if (!response.ok) throw new Error('Failed to join project');
    return response.json();
  },

  // Profile
      async getCurrentUser() {
        const response = await fetch(`${API_BASE_URL}/api/users/me`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
      },

  async updateUser(userData: Partial<UserProfile>) {
    // Include current user ID in the request
    if (!currentUserId) {
      throw new Error('User ID not found. Please log in again.');
    }
    
    const requestData = {
      _id: currentUserId,
      ...userData
    };
    
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user: ${errorText}`);
    }
    return response.json();
  },

  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
    branch: string;
    year: string;
    bio?: string;
    skills?: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to register user');
    }
    return response.json();
  },

  async loginUser(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to login');
    }
    return response.json();
  },

  async listAchievements(userId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/achievements/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch achievements');
    return response.json();
  },

  // Notifications
  async listNotifications(userId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  },

  async markNotificationRead(notificationId: MongoId) {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
    return response.json();
  },
};

export { api };


