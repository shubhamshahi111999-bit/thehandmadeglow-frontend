import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, orderAPI } from '@/services/api';
import { toast } from 'sonner';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      loadAdminProfile();
    }
  }, []);

  const loadAdminProfile = async () => {
    try {
      // Temporarily set token for API call
      const token = localStorage.getItem('adminToken');
      if (token) {
        const response = await authAPI.getProfile();
        const userData = response.data;
        
        // Verify user is admin
        if (userData.is_admin) {
          setIsAuthenticated(true);
          setAdminUser(userData);
        } else {
          // Not an admin, clear token
          localStorage.removeItem('adminToken');
          toast.error('Admin access required');
        }
      }
    } catch (error) {
      console.error('Failed to load admin profile:', error);
      localStorage.removeItem('adminToken');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { access_token } = response.data;
      
      // Store token
      localStorage.setItem('adminToken', access_token);
      localStorage.setItem('authToken', access_token);
      
      // Load profile to verify admin status
      const profileResponse = await authAPI.getProfile();
      const userData = profileResponse.data;
      
      if (!userData.is_admin) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('authToken');
        toast.error('Admin access required');
        return false;
      }
      
      setIsAuthenticated(true);
      setAdminUser(userData);
      toast.success('Welcome back!', {
        description: 'Successfully logged in to admin dashboard'
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials', {
        description: 'Please check your email and password'
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully');
  };

  const value = {
    isAuthenticated,
    adminUser,
    login,
    logout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContext;