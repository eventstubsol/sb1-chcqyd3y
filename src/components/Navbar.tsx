import React, { useState } from 'react';
import { Menu, Ticket, User, PlusCircle, LogOut, UserCog } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import ImpersonateButton from './ImpersonateButton';

export default function Navbar() {
  const { user, logout, isImpersonating, stopImpersonation, originalUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Impersonation Banner */}
      {isImpersonating && originalUser && (
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
      )}

      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="flex items-center space-x-2 text-xl font-bold">
                <Ticket className="h-6 w-6" />
                <span>EventHub</span>
              </span>
              
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Browse Events
                  </a>
                  {user && (
                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                      My Tickets
                    </a>
                  )}
                  {user?.role === 'organizer' && (
                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                      Create Event
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-sm">Welcome, {user.name}</span>
                    <ImpersonateButton />
                    <button
                      onClick={() => logout()}
                      className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleOpenAuth('login')}
                      className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => handleOpenAuth('register')}
                      className="flex items-center space-x-1 px-4 py-2 bg-white text-indigo-600 rounded-md text-sm font-medium hover:bg-gray-100"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Create Account</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-indigo-500">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}