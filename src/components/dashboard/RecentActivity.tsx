import React from 'react';
import { Clock, ChevronRight, Ticket, Star, MessageSquare } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: '1',
      type: 'ticket',
      description: 'Purchased 2 tickets for Tech Conference 2024',
      timestamp: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'save',
      description: 'Saved Music Festival to your wishlist',
      timestamp: '2024-03-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'comment',
      description: 'Commented on Food & Wine Festival',
      timestamp: '2024-03-13T09:20:00Z'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ticket':
        return <Ticket className="h-5 w-5 text-green-500" />;
      case 'save':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {activity.description}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}