import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ImpersonationBanner from '../ImpersonationBanner';
import UserStats from './UserStats';
import UpcomingEvents from './UpcomingEvents';
import RecentActivity from './RecentActivity';
import SavedEvents from './SavedEvents';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <ImpersonationBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-1 text-gray-500">Here's what's happening with your events</p>
        </div>

        {/* Quick Stats */}
        <UserStats />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <UpcomingEvents />

          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Saved Events */}
        <div className="mt-8">
          <SavedEvents />
        </div>
      </div>
    </div>
  );
}