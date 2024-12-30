import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { useRoleManagement } from '../../hooks/useRoleManagement';
import { useAuth } from '../../contexts/AuthContext';
import { User, UserRole } from '../../types';
import { FormSelect } from '../common';

interface RoleManagementProps {
  user: User;
  onRoleChange: (newRole: UserRole) => Promise<void>;
}

export default function RoleManagement({ user, onRoleChange }: RoleManagementProps) {
  const { user: currentUser } = useAuth();
  const { getAssignableRoles, loading } = useRoleManagement();
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);

  const availableRoles = getAssignableRoles(currentUser!).map(role => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
  }));

  const handleRoleChange = async (role: string) => {
    setSelectedRole(role as UserRole);
    await onRoleChange(role as UserRole);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Role Management</h3>
      </div>

      <FormSelect
        label="User Role"
        value={selectedRole}
        onChange={handleRoleChange}
        options={availableRoles}
        disabled={loading}
        required
      />

      {user.role === 'admin' && (
        <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            Changing an admin's role requires super admin privileges and may affect system access.
          </p>
        </div>
      )}
    </div>
  );
}