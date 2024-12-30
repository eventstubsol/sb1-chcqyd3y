import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Tag, Share2, Edit2, Trash2, Download } from 'lucide-react';
import { Event } from '../../types';
import { AnimatedCard } from '../common';
import TicketsList from './sections/TicketsList';
import AttendeesList from './sections/AttendeesList';
import EventAnalytics from './sections/EventAnalytics';
import EventActions from './sections/EventActions';

interface EventDetailsProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EventDetails({ event, onEdit, onDelete }: EventDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'attendees', label: 'Attendees' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnimatedCard>
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.availableTickets} tickets available</span>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Event Schedule</h3>
                <div className="space-y-4">
                  {/* Add schedule items here */}
                </div>
              </AnimatedCard>

              <AnimatedCard>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Venue Information</h3>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  {/* Add map here */}
                  <div className="bg-gray-100 rounded-lg w-full h-64"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">{event.location}</p>
                  {/* Add additional venue details */}
                </div>
              </AnimatedCard>
            </div>

            <div className="space-y-6">
              <EventActions event={event} />

              <AnimatedCard>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tickets Sold</span>
                    <span className="font-medium">123/500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-medium">$12,345</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Page Views</span>
                    <span className="font-medium">1,234</span>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Share Event</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-5 w-5 mr-2" />
                    Export
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        );

      case 'tickets':
        return <TicketsList event={event} />;

      case 'attendees':
        return <AttendeesList event={event} />;

      case 'analytics':
        return <EventAnalytics event={event} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-500">Event Details</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
}