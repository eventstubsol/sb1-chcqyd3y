import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Archive, DollarSign, Calendar, Users } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface TicketsTabProps {
  event: Event;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  sold: number;
  maxPerOrder: number;
  validUntil: string;
  description?: string;
  features?: string[];
}

export default function TicketsTab({ event }: TicketsTabProps) {
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);

  const [ticketTypes] = useState<TicketType[]>([
    {
      id: '1',
      name: 'Early Bird',
      price: event.price * 0.8,
      available: 50,
      sold: 30,
      maxPerOrder: 2,
      validUntil: '2024-04-01',
      description: 'Limited early bird tickets at a special price',
      features: ['Priority seating', 'Welcome drink']
    },
    {
      id: '2',
      name: 'Regular',
      price: event.price,
      available: 200,
      sold: 15,
      maxPerOrder: 4,
      validUntil: event.date,
      description: 'Standard admission ticket',
      features: ['General seating']
    },
    {
      id: '3',
      name: 'VIP',
      price: event.price * 2,
      available: 20,
      sold: 5,
      maxPerOrder: 2,
      validUntil: event.date,
      description: 'VIP experience with exclusive perks',
      features: ['VIP seating', 'Meet & Greet', 'Exclusive merchandise']
    }
  ]);

  const handleEditTicket = (ticketId: string) => {
    setEditingTicketId(ticketId);
  };

  const handleArchiveTicket = (ticketId: string) => {
    console.log('Archiving ticket:', ticketId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Ticket Types</h3>
        <button 
          onClick={() => setIsAddingTicket(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Ticket Type
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ticketTypes.map((ticket) => (
          <AnimatedCard key={ticket.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Ticket className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{ticket.name}</h4>
                  <p className="text-sm text-gray-500">{ticket.description}</p>
                  <div className="mt-2">
                    {ticket.features?.map((feature, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditTicket(ticket.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleArchiveTicket(ticket.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Archive className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-semibold text-gray-900">${ticket.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {ticket.available - ticket.sold} / {ticket.available}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Ticket className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Max per Order</p>
                  <p className="text-lg font-semibold text-gray-900">{ticket.maxPerOrder}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Valid Until</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(ticket.validUntil).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {Math.round((ticket.sold / ticket.available) * 100)}% Sold
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                  <div
                    style={{ width: `${(ticket.sold / ticket.available) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                  ></div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}