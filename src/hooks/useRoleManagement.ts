import { useState, useCallback } from 'react';
import { User, UserRole } from '../types';
import { roleService } from '../services/RoleService';
import { useToast } from '../contexts/ToastContext';

export function useRoleManagement() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const changeUserRole = useCallback(async (
    changer: User,
    target: User,
    newRole: UserRole
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const isValid = await roleService.validateRoleChange(changer, target, newRole);
      if (!isValid) {
        showToast('error', 'You do not have permission to assign this role');
        return false;
      }

      // In a real app, make API call here
      // await api.updateUserRole(target.id, newRole);

      showToast('success', 'Role updated successfully');
      return true;
    } catch (error) {
      showToast('error', 'Failed to update role');
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const checkPermission = useCallback((user: User, permission: string): boolean => {
    return roleService.hasPermission(user, permission);
  }, []);

  const getAssignableRoles = useCallback((user: User): UserRole[] => {
    return roleService.getAssignableRoles(user);
  }, []);

  return {
    loading,
    changeUserRole,
    checkPermission,
    getAssignableRoles
  };
}