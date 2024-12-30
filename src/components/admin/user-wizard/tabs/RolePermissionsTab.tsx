import React from 'react';
import { FormSelect } from '../../../../components/common';
import { Shield, Lock, Eye } from 'lucide-react';
import { useRoleManagement } from '../../../../hooks/useRoleManagement';
import { useAuth } from '../../../../contexts/AuthContext';
import { UserRole } from '../../../../types';

interface RolePermissionsData {
  role: UserRole;
  customPermissions?: string[];
}

interface RolePermissionsTabProps {
  data: RolePermissionsData;
  onChange: (data: RolePermissionsData) => void;
  disabled?: boolean;
}

export default function RolePermissionsTab({ data, onChange, disabled = false }: RolePermissionsTabProps) {
  const { user: currentUser } = useAuth();
  const { getAssignableRoles } = useRoleManagement();

  const assignableRoles = getAssignableRoles(currentUser!).map(role => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1)
  }));

  const permissions = {
    admin: [
      'Manage users and roles',
      'Create and manage events',
      'Access all analytics',
      'Manage billing and subscriptions',
      'Configure system settings'
    ],
    organizer: [
      'Create and manage events',
      'View event analytics',
      'Manage attendees',
      'Access reports'
    ],
    attendee: [
      'View public events',
      'Purchase tickets',
      'Manage personal profile',
      'View order history'
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Role & Permissions</h3>
        <p className="text-sm text-gray-500 mb-4">
          Assign a role and manage permissions for this user.
        </p>
      </div>

      <div>
        <FormSelect
          label="User Role"
          value={data.role}
          onChange={(value) => onChange({ ...data, role: value as UserRole })}
          options={assignableRoles}
          icon={Shield}
          required
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gray-500" />
            <span>Role Permissions</span>
          </div>
        </label>
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-2">
            {permissions[data.role]?.map((permission, index) => (
              <li key={index} className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{permission}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Role changes may affect the user's access to certain features and data.
              Make sure to review the permissions carefully before assigning a role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}