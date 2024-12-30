import { useState, useCallback } from 'react';
import { twoFactorService } from '../services/TwoFactorService';
import { User } from '../types';
import { useToast } from '../contexts/ToastContext';

export function useTwoFactorAuth() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const setupTwoFactor = useCallback(async (user: User) => {
    setLoading(true);
    try {
      const setup = await twoFactorService.setupTwoFactor(user);
      showToast('success', '2FA setup completed successfully');
      return setup;
    } catch (error) {
      showToast('error', 'Failed to set up 2FA');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const verifySession = useCallback((userId: string): boolean => {
    return twoFactorService.isSessionValid(userId);
  }, []);

  const clearSession = useCallback((userId: string) => {
    twoFactorService.clearSession(userId);
  }, []);

  return {
    loading,
    setupTwoFactor,
    verifySession,
    clearSession
  };
}