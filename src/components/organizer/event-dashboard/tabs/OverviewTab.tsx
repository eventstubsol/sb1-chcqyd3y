import React from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OverviewTabProps {
  event: Event;
}

const salesData = [
  { date: '2024-03-01', sales: 12, revenue: 1200 },
  { date: '2024-03-02', sales: 15, revenue: 1500 },
  { date: '2024-03-03', sales: 18, revenue: 1800 },
  { date: '2024-03-04', sales: 22, revenue: 2200 },
  { date: '2024-03-05', sales: 25, revenue: 2500 },
  { date: '2024-03-06', sales: 30, revenue: 3000 },
  { date: '2024-03-07', sales: 45, revenue: 4500 }
];

export default function OverviewTab({ event }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Sales Chart */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                fill="#818CF8"
                fillOpacity={0.3}
                name="Tickets Sold"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fill="#34D399"
                fillOpacity={0.3}
                name="Revenue ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </AnimatedCard>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(event.date).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{event.location}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Ticket Price</dt>
              <dd className="mt-1 text-sm text-gray-900">${event.price}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Available Tickets</dt>
              <dd className="mt-1 text-sm text-gray-900">{event.availableTickets}</dd>
            </div>
          </dl>
        </AnimatedCard>

        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Ticket Purchase', details: '2 tickets by John Doe', time: '5 minutes ago' },
              { action: 'Message Received', details: 'Question about parking', time: '1 hour ago' },
              { action: 'Refund Request', details: 'From Sarah Smith', time: '2 hours ago' },
              { action: 'Event Update', details: 'Added new event details', time: '3 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}