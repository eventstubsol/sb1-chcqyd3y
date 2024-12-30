import React from 'react';
import { UserCog, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ImpersonationBanner() {
  const { user, originalUser, stopImpersonation } = useAuth();

  if (!originalUser) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCog className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-700">
              You are currently impersonating {user?.name} ({user?.email})
            </span>
          </div>
          <button
            onClick={stopImpersonation}
            className="text-sm font-medium text-yellow-700 hover:text-yellow-800 flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            Exit Impersonation
          </button>
        </div>
      </div>
    </div>
  );
}