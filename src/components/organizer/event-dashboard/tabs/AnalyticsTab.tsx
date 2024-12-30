import React from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsTabProps {
  event: Event;
}

const ticketSalesData = [
  { date: '2024-03-01', sales: 12 },
  { date: '2024-03-02', sales: 15 },
  { date: '2024-03-03', sales: 18 },
  { date: '2024-03-04', sales: 22 },
  { date: '2024-03-05', sales: 25 },
  { date: '2024-03-06', sales: 30 },
  { date: '2024-03-07', sales: 45 }
];

const audienceData = [
  { type: 'VIP', count: 25 },
  { type: 'Early Bird', count: 35 },
  { type: 'Regular', count: 45 },
  { type: 'Student', count: 15 }
];

export default function AnalyticsTab({ event }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Ticket Sales Trend */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Sales Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ticketSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ fill: '#4F46E5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AnimatedCard>

      {/* Audience Demographics */}
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Demographics</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={audienceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AnimatedCard>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">68.5%</p>
          <p className="mt-1 text-sm text-green-600">+2.1% from last week</p>
        </AnimatedCard>

        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Average Order Value</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">${event.price * 1.8}</p>
          <p className="mt-1 text-sm text-green-600">+5.3% from last week</p>
        </AnimatedCard>

        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Page Views</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          <p className="mt-1 text-sm text-green-600">+15.2% from last week</p>
        </AnimatedCard>
      </div>
    </div>
  );
}