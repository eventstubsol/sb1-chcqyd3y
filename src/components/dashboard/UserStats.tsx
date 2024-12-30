import React from 'react';
import { Ticket, Calendar, Star, CreditCard } from 'lucide-react';

export default function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </div>
          <Calendar className="h-8 w-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">My Tickets</p>
            <p className="text-2xl font-semibold text-gray-900">8</p>
          </div>
          <Ticket className="h-8 w-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Saved Events</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
          <Star className="h-8 w-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <p className="text-2xl font-semibold text-gray-900">$420</p>
          </div>
          <CreditCard className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}