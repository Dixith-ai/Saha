import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, MongoId } from '@/lib/types';
import { api, setCurrentUserId as setApiCurrentUserId } from '@/lib/api';

interface UserContextType {
  currentUser: UserProfile | null;
  currentUserId: MongoId | null;
  isLoading: boolean;
  error: string | null;
  setCurrentUser: (user: UserProfile | null) => void;
  setCurrentUserId: (userId: MongoId | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentUserId, setCurrentUserId] = useState<MongoId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Logout function
  const logout = () => {
    localStorage.removeItem('saha_user');
    setCurrentUser(null);
    setCurrentUserId(null);
    setApiCurrentUserId(null); // Clear in API layer
  };

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('saha_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check localStorage first
        const savedUser = localStorage.getItem('saha_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          setCurrentUserId(user._id);
          setApiCurrentUserId(user._id); // Set in API layer
          setIsLoading(false);
          return;
        }
        
        // If no saved user, fetch from API (for demo purposes)
        const user = await api.getCurrentUser();
        setCurrentUser(user);
        setCurrentUserId(user._id);
        setApiCurrentUserId(user._id); // Set in API layer
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
        console.error('Error fetching current user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      currentUserId, 
      isLoading, 
      error, 
      setCurrentUser, 
      setCurrentUserId,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};