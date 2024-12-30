import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, ShieldCheck } from 'lucide-react';

export default function LoginForm() {
  const { login } = useAuth();
  
  const loginAsAdmin = () => {
    login('admin@eventhub.com', 'admin123');
  };
  
  const loginAsOrganizer = () => {
    login('organizer@eventhub.com', 'organizer123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to EventHub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Modern Event Ticketing Platform
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={loginAsAdmin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ShieldCheck className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
            </span>
            Login as Super Admin
          </button>
          
          <button
            onClick={loginAsOrganizer}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Building2 className="h-5 w-5 text-green-300 group-hover:text-green-200" />
            </span>
            Login as Organizer
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Click any button to login with demo credentials
          </p>
        </div>
      </div>
    </div>
  );
}