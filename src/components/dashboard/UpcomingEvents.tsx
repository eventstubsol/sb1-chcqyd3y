import React from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

export default function UpcomingEvents() {
  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: '2024-04-15',
      location: 'San Francisco, CA',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    },
    {
      id: '2',
      title: 'Music Festival',
      date: '2024-04-20',
      location: 'Austin, TX',
      imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'
    },
    {
      id: '3',
      title: 'Food & Wine Festival',
      date: '2024-05-01',
      location: 'New York, NY',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                  {event.location}
                </div>
              </div>
              <button className="flex-shrink-0 btn-primary">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}