import { useState, useCallback } from 'react';
import { adminService } from '../services/AdminService';
import { useToast } from '../contexts/ToastContext';
import { Tenant, User, Event } from '../types';

export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Tenant Management
  const createTenant = useCallback(async (tenantData: Partial<Tenant>) => {
    setLoading(true);
    try {
      const tenant = await adminService.createTenant(tenantData);
      showToast('success', 'Tenant created successfully');
      return tenant;
    } catch (err) {
      showToast('error', 'Failed to create tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateTenant = useCallback(async (id: string, updates: Partial<Tenant>) => {
    setLoading(true);
    try {
      const tenant = await adminService.updateTenant(id, updates);
      showToast('success', 'Tenant updated successfully');
      return tenant;
    } catch (err) {
      showToast('error', 'Failed to update tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteTenant = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await adminService.deleteTenant(id);
      showToast('success', 'Tenant deleted successfully');
    } catch (err) {
      showToast('error', 'Failed to delete tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // User Management
  const createUser = useCallback(async (userData: Partial<User>, tenantId?: string) => {
    setLoading(true);
    try {
      const user = await adminService.createUser(userData, tenantId);
      showToast('success', 'User created successfully');
      return user;
    } catch (err) {
      showToast('error', 'Failed to create user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateUser = useCallback(async (userId: string, updates: Partial<User>) => {
    setLoading(true);
    try {
      const user = await adminService.updateUser(userId, updates);
      showToast('success', 'User updated successfully');
      return user;
    } catch (err) {
      showToast('error', 'Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      await adminService.deleteUser(userId);
      showToast('success', 'User deleted successfully');
    } catch (err) {
      showToast('error', 'Failed to delete user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Event Management
  const updateEvent = useCallback(async (eventId: string, updates: Partial<Event>) => {
    setLoading(true);
    try {
      const event = await adminService.updateEvent(eventId, updates);
      showToast('success', 'Event updated successfully');
      return event;
    } catch (err) {
      showToast('error', 'Failed to update event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteEvent = useCallback(async (eventId: string) => {
    setLoading(true);
    try {
      await adminService.deleteEvent(eventId);
      showToast('success', 'Event deleted successfully');
    } catch (err) {
      showToast('error', 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // System Management
  const createBackup = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.createBackup();
      showToast('success', 'Backup created successfully');
      return result;
    } catch (err) {
      showToast('error', 'Failed to create backup');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const restoreBackup = useCallback(async (backupId: string) => {
    setLoading(true);
    try {
      const result = await adminService.restoreBackup(backupId);
      showToast('success', 'Backup restored successfully');
      return result;
    } catch (err) {
      showToast('error', 'Failed to restore backup');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // API Management
  const createApiKey = useCallback(async (name: string, permissions: string[]) => {
    setLoading(true);
    try {
      const apiKey = await adminService.createApiKey(name, permissions);
      showToast('success', 'API key created successfully');
      return apiKey;
    } catch (err) {
      showToast('error', 'Failed to create API key');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const revokeApiKey = useCallback(async (keyId: string) => {
    setLoading(true);
    try {
      await adminService.revokeApiKey(keyId);
      showToast('success', 'API key revoked successfully');
    } catch (err) {
      showToast('error', 'Failed to revoke API key');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Content Moderation
  const moderateContent = useCallback(async (contentId: string, action: 'approve' | 'reject', reason?: string) => {
    setLoading(true);
    try {
      await adminService.moderateContent(contentId, action, reason);
      showToast('success', `Content ${action}ed successfully`);
    } catch (err) {
      showToast('error', `Failed to ${action} content`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Utility Functions
  const impersonateUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const result = await adminService.impersonateUser(userId);
      showToast('success', 'User impersonation started');
      return result;
    } catch (err) {
      showToast('error', 'Failed to impersonate user');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const exportData = useCallback(async (type: string, filters?: any) => {
    setLoading(true);
    try {
      const blob = await adminService.exportData(type, filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-export-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('success', 'Data exported successfully');
    } catch (err) {
      showToast('error', 'Failed to export data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    error,
    createTenant,
    updateTenant,
    deleteTenant,
    createUser,
    updateUser,
    deleteUser,
    updateEvent,
    deleteEvent,
    createBackup,
    restoreBackup,
    createApiKey,
    revokeApiKey,
    moderateContent,
    impersonateUser,
    exportData
  };
}