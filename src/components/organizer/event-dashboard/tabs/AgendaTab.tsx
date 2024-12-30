import React, { useState } from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import AgendaBuilder from '../../../events/agenda/AgendaBuilder';

interface AgendaTabProps {
  event: Event;
}

export default function AgendaTab({ event }: AgendaTabProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveAgenda = async (sessions: any[], tracks: any[]) => {
    // Here we would save the agenda to the backend
    console.log('Saving agenda:', { sessions, tracks });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Event Agenda</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'View Agenda' : 'Edit Agenda'}
        </button>
      </div>

      {isEditing ? (
        <AgendaBuilder onSave={handleSaveAgenda} />
      ) : (
        <AnimatedCard>
          <div className="space-y-6">
            {/* Sample agenda display - replace with actual agenda data */}
            <div className="border-l-4 border-indigo-500 pl-4">
              <div className="text-sm text-gray-500">9:00 AM - 10:00 AM</div>
              <h4 className="text-lg font-medium text-gray-900">Registration & Welcome</h4>
              <p className="text-gray-600">Main Hall</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <div className="text-sm text-gray-500">10:00 AM - 11:30 AM</div>
              <h4 className="text-lg font-medium text-gray-900">Keynote Speaker</h4>
              <p className="text-gray-600">Auditorium</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <div className="text-sm text-gray-500">11:45 AM - 12:45 PM</div>
              <h4 className="text-lg font-medium text-gray-900">Breakout Sessions</h4>
              <p className="text-gray-600">Various Rooms</p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <div className="text-sm text-gray-500">1:00 PM - 2:00 PM</div>
              <h4 className="text-lg font-medium text-gray-900">Lunch Break</h4>
              <p className="text-gray-600">Dining Hall</p>
            </div>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}