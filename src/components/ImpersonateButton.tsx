import React, { useState } from 'react';
import { UserPlus, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';

const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@eventhub.com',
    role: 'admin',
    isSuperAdmin: true
  },
  {
    id: '2',
    name: 'Event Organizer',
    email: 'organizer@eventhub.com',
    role: 'organizer'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@eventhub.com',
    role: 'user'
  }
];

export default function ImpersonateButton() {
  const { user, impersonateUser, isImpersonating, stopImpersonation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user?.isSuperAdmin) return null;

  const handleImpersonate = (selectedUser: User) => {
    if (selectedUser.id !== user.id) {
      impersonateUser(selectedUser);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isImpersonating ? (
        <button
          onClick={stopImpersonation}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-900"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Stop Impersonation
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Login As
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu">
                {DEMO_USERS.map((demoUser) => (
                  <button
                    key={demoUser.id}
                    onClick={() => handleImpersonate(demoUser)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <div className="font-medium">{demoUser.name}</div>
                    <div className="text-xs text-gray-500">{demoUser.email}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}