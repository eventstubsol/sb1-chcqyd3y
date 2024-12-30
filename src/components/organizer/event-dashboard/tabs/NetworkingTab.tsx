import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Settings, Plus, Trash2 } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface NetworkingTabProps {
  event: Event;
}

interface NetworkingSession {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  type: 'speed' | 'roundtable' | 'meetup';
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface NetworkingSettings {
  enableChat: boolean;
  enableVideoMeetings: boolean;
  maxConnectionsPerUser: number;
  autoMatchmaking: boolean;
}

export default function NetworkingTab({ event }: NetworkingTabProps) {
  const [settings, setSettings] = useState<NetworkingSettings>({
    enableChat: true,
    enableVideoMeetings: true,
    maxConnectionsPerUser: 50,
    autoMatchmaking: true
  });

  const [sessions] = useState<NetworkingSession[]>([
    {
      id: '1',
      title: 'Speed Networking Session',
      description: 'Quick 5-minute meetings with other attendees',
      startTime: '2024-03-15T14:00:00Z',
      endTime: '2024-03-15T15:00:00Z',
      maxParticipants: 30,
      currentParticipants: 25,
      type: 'speed',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Industry Roundtable',
      description: 'Discussion about emerging trends',
      startTime: '2024-03-15T16:00:00Z',
      endTime: '2024-03-15T17:00:00Z',
      maxParticipants: 20,
      currentParticipants: 15,
      type: 'roundtable',
      status: 'upcoming'
    }
  ]);

  const handleCreateSession = () => {
    console.log('Creating new networking session');
  };

  const handleDeleteSession = (sessionId: string) => {
    console.log('Deleting session:', sessionId);
  };

  return (
    <div className="space-y-6">
      {/* Settings */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Networking Settings</h3>
          </div>
          <button
            onClick={() => console.log('Saving settings:', settings)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enableChat}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  enableChat: e.target.checked
                }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Chat</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enableVideoMeetings}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  enableVideoMeetings: e.target.checked
                }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Video Meetings</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Connections per User
            </label>
            <input
              type="number"
              value={settings.maxConnectionsPerUser}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                maxConnectionsPerUser: parseInt(e.target.value)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoMatchmaking}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  autoMatchmaking: e.target.checked
                }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable Auto-Matchmaking</span>
            </label>
          </div>
        </div>
      </AnimatedCard>

      {/* Networking Sessions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Networking Sessions</h3>
        <button
          onClick={handleCreateSession}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Session
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sessions.map((session) => (
          <AnimatedCard key={session.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {session.type === 'speed' ? (
                    <Users className="h-6 w-6 text-indigo-600" />
                  ) : session.type === 'roundtable' ? (
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                  ) : (
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{session.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{session.description}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Start Time:</span>{' '}
                      {new Date(session.startTime).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">End Time:</span>{' '}
                      {new Date(session.endTime).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Participants:</span>{' '}
                      {session.currentParticipants} / {session.maxParticipants}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{' '}
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  session.status === 'upcoming'
                    ? 'bg-yellow-100 text-yellow-800'
                    : session.status === 'ongoing'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(session.currentParticipants / session.maxParticipants) * 100}%` }}
              />
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}