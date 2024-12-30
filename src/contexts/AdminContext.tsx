import React, { createContext, useContext, useState, useCallback } from 'react';
import { adminService } from '../services/AdminService';
import { useToast } from './ToastContext';
import { SystemHealth, AIInsight } from '../types';

interface AdminContextType {
  systemHealth: SystemHealth | null;
  insights: AIInsight[];
  loading: boolean;
  error: string | null;
  refreshSystemHealth: () => Promise<void>;
  generateInsights: (tenantId?: string) => Promise<void>;
  clearError: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const refreshSystemHealth = useCallback(async () => {
    setLoading(true);
    try {
      const health = await adminService.getSystemHealth();
      setSystemHealth(health);
    } catch (err) {
      setError('Failed to fetch system health');
      showToast('error', 'Failed to fetch system health');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const generateInsights = useCallback(async (tenantId?: string) => {
    setLoading(true);
    try {
      const newInsights = await adminService.generateInsights(tenantId);
      setInsights(newInsights);
    } catch (err) {
      setError('Failed to generate insights');
      showToast('error', 'Failed to generate insights');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        systemHealth,
        insights,
        loading,
        error,
        refreshSystemHealth,
        generateInsights,
        clearError
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}