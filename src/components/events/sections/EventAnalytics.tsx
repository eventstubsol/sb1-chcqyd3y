import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Event } from '../../../types';
import { AnimatedCard } from '../../common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EventAnalyticsProps {
  event: Event;
}

const sampleData = [
  { date: '2024-01', tickets: 45, revenue: 2250 },
  { date: '2024-02', tickets: 65, revenue: 3250 },
  { date: '2024-03', tickets: 85, revenue: 4250 },
  { date: '2024-04', tickets: 95, revenue: 4750 }
];

export default function EventAnalytics({ event }: EventAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">$4,750</p>
              <p className="mt-1 text-sm text-green-600">+12% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
              <p className="text-2xl font-bold text-gray-900">95</p>
              <p className="mt-1 text-sm text-green-600">+8% from last month</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="mt-1 text-sm text-green-600">+15% from last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">7.8%</p>
              <p className="mt-1 text-sm text-green-600">+2% from last month</p>
            </div>
            <BarChart2 className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="tickets" fill="#4F46E5" name="Tickets" />
                <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Types Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { type: 'VIP', count: 25 },
                { type: 'Early Bird', count: 35 },
                { type: 'Regular', count: 45 },
                { type: 'Student', count: 15 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}