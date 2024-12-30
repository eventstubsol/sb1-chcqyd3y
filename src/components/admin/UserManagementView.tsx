import React, { useState } from 'react';
import { Users, Calendar, Plus, Edit2 } from 'lucide-react';
import { AnimatedCard } from '../../common';
import UserWizard from '../user-wizard/UserWizard';

interface UserManagementViewProps {
  tenant: any;
}

export default function UserManagementView({ tenant }: UserManagementViewProps) {
  const [showUserWizard, setShowUserWizard] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [wizardMode, setWizardMode] = useState<'create' | 'edit' | 'view'>('create');

  const handleAddUser = () => {
    setSelectedUser(null);
    setWizardMode('create');
    setShowUserWizard(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setWizardMode('view');
    setShowUserWizard(true);
  };

  const handleEditUser = () => {
    setWizardMode('edit');
  };

  const handleCloseWizard = () => {
    setShowUserWizard(false);
    setSelectedUser(null);
    setWizardMode('create');
  };

  const handleUserSubmit = async (userData: any) => {
    // Handle user creation/update logic here
    console.log('User data:', userData);
    handleCloseWizard();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Management</h3>
        <button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <AnimatedCard>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Active</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tenant.users?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="capitalize">{user.role}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right space-x-3">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
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
          onSubmit={handleUserSubmit}
          onEdit={handleEditUser}
        />
      )}
    </div>
  );
}