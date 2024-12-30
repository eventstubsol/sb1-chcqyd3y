import React, { useState } from 'react';
import { Ticket, Share2, Download, Edit2, Trash2 } from 'lucide-react';
import { Event } from '../../../types';
import { AnimatedCard } from '../../common';

interface EventActionsProps {
  event: Event;
}

export default function EventActions({ event }: EventActionsProps) {
  const [showTicketModal, setShowTicketModal] = useState(false);

  return (
    <AnimatedCard>
      <div className="space-y-4">
        <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Ticket className="h-5 w-5 mr-2" />
          Buy Tickets
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Price</span>
            <span className="font-medium">${event.price}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-gray-500">Available Tickets</span>
            <span className="font-medium">{event.availableTickets}</span>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}