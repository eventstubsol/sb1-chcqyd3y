import React, { useState } from 'react';
import { Plus, Minus, Clock, User, MapPin } from 'lucide-react';
import { FormInput, FormSelect } from '../../common';

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  track?: string;
  speakers: string[];
  location: string;
  type: 'talk' | 'workshop' | 'panel' | 'break' | 'networking';
}

interface Track {
  id: string;
  name: string;
  color: string;
}

interface AgendaBuilderProps {
  onSave: (sessions: Session[], tracks: Track[]) => void;
  initialSessions?: Session[];
  initialTracks?: Track[];
}

export default function AgendaBuilder({ onSave, initialSessions = [], initialTracks = [] }: AgendaBuilderProps) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);

  const addSession = () => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      speakers: [],
      location: '',
      type: 'talk'
    };
    setSessions([...sessions, newSession]);
  };

  const addTrack = () => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      name: '',
      color: '#4F46E5'
    };
    setTracks([...tracks, newTrack]);
  };

  const updateSession = (id: string, updates: Partial<Session>) => {
    setSessions(sessions.map(session =>
      session.id === id ? { ...session, ...updates } : session
    ));
  };

  const updateTrack = (id: string, updates: Partial<Track>) => {
    setTracks(tracks.map(track =>
      track.id === id ? { ...track, ...updates } : track
    ));
  };

  const removeSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const removeTrack = (id: string) => {
    setTracks(tracks.filter(track => track.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Tracks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Event Tracks</h3>
          <button
            onClick={addTrack}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Track
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks.map(track => (
            <div key={track.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <FormInput
                  label="Track Name"
                  value={track.name}
                  onChange={(value) => updateTrack(track.id, { name: value })}
                  required
                />
                <div className="ml-4">
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="color"
                    value={track.color}
                    onChange={(e) => updateTrack(track.id, { color: e.target.value })}
                    className="h-9 w-9 rounded border border-gray-300"
                  />
                </div>
                <button
                  onClick={() => removeTrack(track.id)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Sessions</h3>
          <button
            onClick={addSession}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Session
          </button>
        </div>

        <div className="space-y-4">
          {sessions.map(session => (
            <div key={session.id} className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Session Title"
                  value={session.title}
                  onChange={(value) => updateSession(session.id, { title: value })}
                  required
                />

                <FormSelect
                  label="Session Type"
                  value={session.type}
                  onChange={(value) => updateSession(session.id, { type: value as Session['type'] })}
                  options={[
                    { value: 'talk', label: 'Talk' },
                    { value: 'workshop', label: 'Workshop' },
                    { value: 'panel', label: 'Panel Discussion' },
                    { value: 'break', label: 'Break' },
                    { value: 'networking', label: 'Networking' }
                  ]}
                  required
                />

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={session.description}
                    onChange={(e) => updateSession(session.id, { description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={session.startTime}
                        onChange={(e) => updateSession(session.id, { startTime: e.target.value })}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={session.endTime}
                        onChange={(e) => updateSession(session.id, { endTime: e.target.value })}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {tracks.length > 0 && (
                  <FormSelect
                    label="Track"
                    value={session.track || ''}
                    onChange={(value) => updateSession(session.id, { track: value })}
                    options={[
                      { value: '', label: 'No Track' },
                      ...tracks.map(track => ({
                        value: track.id,
                        label: track.name
                      }))
                    ]}
                  />
                )}

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Speakers</label>
                  <div className="mt-1 space-y-2">
                    {session.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={speaker}
                            onChange={(e) => {
                              const newSpeakers = [...session.speakers];
                              newSpeakers[index] = e.target.value;
                              updateSession(session.id, { speakers: newSpeakers });
                            }}
                            className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Speaker name"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newSpeakers = session.speakers.filter((_, i) => i !== index);
                            updateSession(session.id, { speakers: newSpeakers });
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSpeakers = [...session.speakers, ''];
                        updateSession(session.id, { speakers: newSpeakers });
                      }}
                      className="flex items-center text-indigo-600 hover:text-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Speaker
                    </button>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={session.location}
                      onChange={(e) => updateSession(session.id, { location: e.target.value })}
                      className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Room or location"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => removeSession(session.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(sessions, tracks)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Agenda
        </button>
      </div>
    </div>
  );
}