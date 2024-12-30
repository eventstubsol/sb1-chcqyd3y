import React, { useState } from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Calendar, Clock, Globe, MapPin, Users, Mail, Phone, Building2,
  Edit2, Save, X, DollarSign, User
} from 'lucide-react';

interface EventOverviewProps {
  event: Event;
}

interface EventDetails {
  name: string;
  description: string;
  timeZone: string;
  startDate: string;
  endDate: string;
  expectedAttendees: number;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  host: {
    name: string;
    email: string;
    phone: string;
    organization: string;
  };
}

const mockEventDetails: EventDetails = {
  name: "Tech Conference 2024",
  description: "Join us for the most innovative tech conference of the year, featuring industry leaders and cutting-edge technologies.",
  timeZone: "America/Los_Angeles",
  startDate: "2024-09-20T08:00:00Z",
  endDate: "2024-09-20T17:00:00Z",
  expectedAttendees: 500,
  venue: {
    name: "San Francisco Conference Center",
    address: "123 Tech Boulevard",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States"
  },
  host: {
    name: "John Doe",
    email: "john@techconference.com",
    phone: "+1 (555) 123-4567",
    organization: "Tech Events Inc"
  }
};

export default function EventOverview({ event }: EventOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails>(mockEventDetails);
  const [tempDetails, setTempDetails] = useState<EventDetails>(mockEventDetails);

  const handleEdit = () => {
    setTempDetails(eventDetails);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempDetails(eventDetails);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Here we would make an API call to save the changes
      // For now, we'll just update the local state
      setEventDetails(tempDetails);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving event details:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVenueChange = (field: string, value: string) => {
    setTempDetails(prev => ({
      ...prev,
      venue: {
        ...prev.venue,
        [field]: value
      }
    }));
  };

  const handleHostChange = (field: string, value: string) => {
    setTempDetails(prev => ({
      ...prev,
      host: {
        ...prev.host,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Event Details Card */}
      <AnimatedCard>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Event Details</h3>
            <p className="mt-1 text-sm text-gray-500">Basic information about your event</p>
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-base text-gray-900">{eventDetails.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              {isEditing ? (
                <textarea
                  value={tempDetails.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-base text-gray-900">{eventDetails.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={tempDetails.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-base text-gray-900">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    {new Date(eventDetails.startDate).toLocaleString()}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={tempDetails.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-base text-gray-900">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    {new Date(eventDetails.endDate).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time Zone</label>
              {isEditing ? (
                <select
                  value={tempDetails.timeZone}
                  onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {Intl.supportedValuesOf('timeZone').map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="mt-1 flex items-center text-base text-gray-900">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  {eventDetails.timeZone}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Attendees</label>
              {isEditing ? (
                <input
                  type="number"
                  value={tempDetails.expectedAttendees}
                  onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <div className="mt-1 flex items-center text-base text-gray-900">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  {eventDetails.expectedAttendees} attendees
                </div>
              )}
            </div>
          </div>

          {/* Venue and Host Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Venue Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Venue Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempDetails.venue.name}
                    onChange={(e) => handleVenueChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="mt-1 text-base text-gray-900">{eventDetails.venue.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempDetails.venue.address}
                    onChange={(e) => handleVenueChange('address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="mt-1 text-base text-gray-900">{eventDetails.venue.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempDetails.venue.city}
                      onChange={(e) => handleVenueChange('city', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900">{eventDetails.venue.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempDetails.venue.state}
                      onChange={(e) => handleVenueChange('state', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 text-base text-gray-900">{eventDetails.venue.state}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Host Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Host Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempDetails.host.name}
                    onChange={(e) => handleHostChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-base text-gray-900">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    {eventDetails.host.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempDetails.host.email}
                    onChange={(e) => handleHostChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-base text-gray-900">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    {eventDetails.host.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempDetails.host.phone}
                    onChange={(e) => handleHostChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-base text-gray-900">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    {eventDetails.host.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Venue Map */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Venue Location</h3>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
              `${eventDetails.venue.address}, ${eventDetails.venue.city}, ${eventDetails.venue.state}`
            )}`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>
      </AnimatedCard>
    </div>
  );
}