import React, { useState } from 'react';
import { Search, Filter, Tag, Users, MapPin, Calendar } from 'lucide-react';
import { AnimatedCard } from '../../common';
import { Event } from '../../../types';
import EventDashboard from '../event-dashboard/EventDashboard';
import { sampleEvents } from '../../../services/mockData/events';

export default function EventsTab() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events = sampleEvents;

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (selectedEvent) {
    return (
      <EventDashboard 
        event={selectedEvent} 
        onBack={() => setSelectedEvent(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 border ${
              view === 'grid'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'border-gray-300 text-gray-700'
            } rounded-l-md`}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 border ${
              view === 'list'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'border-gray-300 text-gray-700'
            } rounded-r-md`}
          >
            List
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredEvents.map((event) => (
          <AnimatedCard key={event.id}>
            {view === 'grid' ? (
              <div>
                <div className="relative h-48">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <span className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'upcoming'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{event.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {event.availableTickets} tickets available
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Tag className="h-4 w-4 mr-2" />
                      ${event.price}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Manage Event
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-4">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-24 w-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.availableTickets} tickets
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      ${event.price}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Manage Event
                </button>
              </div>
            )}
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}