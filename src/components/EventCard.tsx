import React, { useState } from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Event } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {event.availableTickets < 20 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            Only {event.availableTickets} left!
          </span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Ticket className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.availableTickets} tickets left</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ${event.price}
          </span>
          <button
            onClick={() => user ? setShowPurchaseModal(true) : alert('Please sign in to purchase tickets')}
            className="btn-primary"
          >
            <Ticket className="h-4 w-4" />
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}