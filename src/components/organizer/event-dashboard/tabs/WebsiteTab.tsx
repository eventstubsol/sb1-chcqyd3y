import React, { useState } from 'react';
import { Globe, Image, Calendar, Users, Edit2, Plus, Trash2 } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface WebsiteTabProps {
  event: Event;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

interface ScheduleItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  speaker: string;
  location: string;
  description: string;
}

export default function WebsiteTab({ event }: WebsiteTabProps) {
  const [activeSection, setActiveSection] = useState<'general' | 'schedule' | 'sponsors'>('general');
  const [sponsors] = useState<Sponsor[]>([
    {
      id: '1',
      name: 'TechCorp',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
      website: 'https://techcorp.com',
      tier: 'platinum'
    },
    {
      id: '2',
      name: 'InnovateLabs',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3624',
      website: 'https://innovatelabs.com',
      tier: 'gold'
    }
  ]);

  const [schedule] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: 'Registration & Welcome',
      startTime: '09:00',
      endTime: '10:00',
      speaker: '',
      location: 'Main Hall',
      description: 'Check-in and welcome refreshments'
    },
    {
      id: '2',
      title: 'Keynote Speech',
      startTime: '10:00',
      endTime: '11:30',
      speaker: 'John Smith',
      location: 'Auditorium',
      description: 'Opening keynote presentation'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('general')}
          className={`px-4 py-2 text-sm font-medium ${
            activeSection === 'general'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveSection('schedule')}
          className={`px-4 py-2 text-sm font-medium ${
            activeSection === 'schedule'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => setActiveSection('sponsors')}
          className={`px-4 py-2 text-sm font-medium ${
            activeSection === 'sponsors'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sponsors
        </button>
      </div>

      {/* Content */}
      {activeSection === 'general' && (
        <div className="space-y-6">
          <AnimatedCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Website Settings</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Save Changes
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event URL</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://events.com/
                  </span>
                  <input
                    type="text"
                    defaultValue={event.title.toLowerCase().replace(/\s+/g, '-')}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={event.description}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {activeSection === 'schedule' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Event Schedule</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Session
            </button>
          </div>

          <div className="space-y-4">
            {schedule.map((item) => (
              <AnimatedCard key={item.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.startTime} - {item.endTime}</span>
                        <span>{item.location}</span>
                        {item.speaker && <span>Speaker: {item.speaker}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'sponsors' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Event Sponsors</h3>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Sponsor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsors.map((sponsor) => (
              <AnimatedCard key={sponsor.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-16 w-16 object-contain rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{sponsor.name}</h4>
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        {sponsor.website}
                      </a>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sponsor.tier === 'platinum'
                          ? 'bg-purple-100 text-purple-800'
                          : sponsor.tier === 'gold'
                          ? 'bg-yellow-100 text-yellow-800'
                          : sponsor.tier === 'silver'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}