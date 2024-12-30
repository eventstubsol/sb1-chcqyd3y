import React, { useState } from 'react';
import { Users, UserPlus, Eye, Edit2, UserCheck } from 'lucide-react';
import { AnimatedCard } from '../../common';
import UserWizard from '../user-wizard/UserWizard';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';

interface UserManagementViewProps {
  tenant: any;
}

export default function UserManagementView({ tenant }: UserManagementViewProps) {
  const [showUserWizard, setShowUserWizard] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [wizardMode, setWizardMode] = useState<'create' | 'edit' | 'view'>('create');
  const { impersonateUser } = useAuth();
  const { showToast } = useToast();

  const handleAddUser = async (userData: any) => {
    try {
      // Handle user creation logic here
      showToast('success', 'User added successfully');
      setShowUserWizard(false);
      setSelectedUser(null);
    } catch (error) {
      showToast('error', 'Failed to add user');
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setWizardMode('view');
    setShowUserWizard(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setWizardMode('edit');
    setShowUserWizard(true);
  };

  const handleImpersonateUser = async (user: any) => {
    try {
      await impersonateUser(user);
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  const handleCloseWizard = () => {
    setShowUserWizard(false);
    setSelectedUser(null);
    setWizardMode('create');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">User Management</h3>
        <button
          onClick={() => {
            setWizardMode('create');
            setSelectedUser(null);
            setShowUserWizard(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <AnimatedCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenant.users?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-4 w-4 inline-block" />
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-4 w-4 inline-block" />
                    </button>
                    <button
                      onClick={() => handleImpersonateUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <UserCheck className="h-4 w-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {showUserWizard && (
        <UserWizard
          isOpen={showUserWizard}
          onClose={handleCloseWizard}
          initialData={selectedUser}
          mode={wizardMode}
          tenant={tenant}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
}