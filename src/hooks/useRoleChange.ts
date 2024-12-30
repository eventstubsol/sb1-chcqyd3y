import { useState, useCallback } from 'react';
import { User, UserRole } from '../types';
import { roleChangeService } from '../services/RoleChangeService';
import { useToast } from '../contexts/ToastContext';

export function useRoleChange() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const requestRoleChange = useCallback(async (
    requester: User,
    targetUser: User,
    newRole: UserRole
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const requestId = await roleChangeService.requestRoleChange(
        requester,
        targetUser,
        newRole
      );
      showToast('success', 'Role change request submitted successfully');
      return true;
    } catch (error: any) {
      showToast('error', error.message || 'Failed to request role change');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const approveRoleChange = useCallback(async (
    approverId: string,
    requestId: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await roleChangeService.approveRoleChange(approverId, requestId);
      showToast('success', 'Role change approved successfully');
      return true;
    } catch (error) {
      showToast('error', 'Failed to approve role change');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const rejectRoleChange = useCallback(async (
    approverId: string,
    requestId: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await roleChangeService.rejectRoleChange(approverId, requestId);
      showToast('success', 'Role change rejected');
      return true;
    } catch (error) {
      showToast('error', 'Failed to reject role change');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const delegateAdminAccess = useCallback(async (
    adminId: string,
    delegateId: string,
    tenantId: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await roleChangeService.delegateAdminAccess(adminId, delegateId, tenantId);
      showToast('success', 'Admin access delegated successfully');
      return true;
    } catch (error) {
      showToast('error', 'Failed to delegate admin access');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    loading,
    requestRoleChange,
    approveRoleChange,
    rejectRoleChange,
    delegateAdminAccess,
    getPendingRequests: roleChangeService.getPendingRequests.bind(roleChangeService),
    getRequestHistory: roleChangeService.getRequestHistory.bind(roleChangeService),
    isDelegatedAdmin: roleChangeService.isDelegatedAdmin.bind(roleChangeService)
  };
}