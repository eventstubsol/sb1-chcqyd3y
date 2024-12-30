import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isImpersonating: boolean;
  originalUser: User | null;
  returnToTab?: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  impersonateUser: (userToImpersonate: User) => Promise<void>;
  stopImpersonation: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [returnToTab, setReturnToTab] = useState<string | undefined>();
  const { showToast } = useToast();

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock authentication with role-based users
      let mockUser: User;
      
      if (email.includes('organizer')) {
        mockUser = {
          id: '2',
          email,
          name: 'Organizer User',
          role: 'organizer'
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin'
        };
      } else {
        mockUser = {
          id: '3',
          email,
          name: 'Attendee User',
          role: 'attendee'
        };
      }

      setUser(mockUser);
      showToast('success', `Welcome back, ${mockUser.name}!`);
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : 'Unable to connect. Please try again in a moment.';
      showToast('error', message);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role
      };
      setUser(mockUser);
      showToast('success', 'Account created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create account';
      showToast('error', message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setUser(null);
      setIsImpersonating(false);
      setOriginalUser(null);
      setReturnToTab(undefined);
      showToast('success', 'Logged out successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to log out';
      showToast('error', message);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const impersonateUser = useCallback(async (userToImpersonate: User) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      if (!user.isSuperAdmin) {
        throw new Error('Insufficient permissions');
      }

      if (userToImpersonate.id === user.id) {
        throw new Error('Cannot impersonate yourself');
      }

      setOriginalUser(user);
      setUser(userToImpersonate);
      setIsImpersonating(true);
      showToast('success', `Now impersonating ${userToImpersonate.name}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to impersonate user';
      showToast('error', message);
      throw error;
    }
  }, [user, showToast]);

  const stopImpersonation = useCallback(() => {
    if (originalUser) {
      setUser(originalUser);
      setOriginalUser(null);
      setIsImpersonating(false);
      setReturnToTab('tenants');
      showToast('success', 'Returned to original user');
    }
  }, [originalUser, showToast]);

  const value = {
    user,
    loading,
    isImpersonating,
    originalUser,
    returnToTab,
    login,
    register,
    logout,
    impersonateUser,
    stopImpersonation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};