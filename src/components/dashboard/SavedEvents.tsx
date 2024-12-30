import React from 'react';
import { Star, Calendar, MapPin, ChevronRight } from 'lucide-react';

export default function SavedEvents() {
  const savedEvents = [
    {
      id: '1',
      title: 'Summer Music Festival',
      date: '2024-07-15',
      location: 'Los Angeles, CA',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      price: 299
    },
    {
      id: '2',
      title: 'Food & Wine Expo',
      date: '2024-06-20',
      location: 'Chicago, IL',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      price: 150
    },
    {
      id: '3',
      title: 'Tech Summit 2024',
      date: '2024-08-10',
      location: 'Seattle, WA',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      price: 599
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Saved Events</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
                  <Star className="h-5 w-5 text-yellow-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    ${event.price}
                  </span>
                  <button className="btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}