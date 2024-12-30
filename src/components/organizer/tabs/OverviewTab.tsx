import React from 'react';
import { Calendar, Users, DollarSign, BarChart2, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { AnimatedCard } from '../../common';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12500, tickets: 250 },
  { month: 'Feb', revenue: 15000, tickets: 300 },
  { month: 'Mar', revenue: 18000, tickets: 360 },
  { month: 'Apr', revenue: 22000, tickets: 440 },
  { month: 'May', revenue: 25000, tickets: 500 },
  { month: 'Jun', revenue: 30000, tickets: 600 }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    date: '2024-06-15',
    registrations: 245,
    capacity: 500,
    status: 'on-track'
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    date: '2024-07-01',
    registrations: 180,
    capacity: 200,
    status: 'attention'
  },
  {
    id: '3',
    title: 'Digital Marketing Workshop',
    date: '2024-05-30',
    registrations: 48,
    capacity: 50,
    status: 'almost-full'
  }
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$30,000</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +20% from last month
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Events</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                2 new this month
              </p>
            </div>
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">2,450</p>
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15% from last month
              </p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Ticket Price</p>
              <p className="text-2xl font-bold text-gray-900">$50</p>
              <p className="mt-1 text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last 30 days
              </p>
            </div>
            <BarChart2 className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <select className="border rounded-md px-3 py-1.5 text-sm text-gray-700">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F46E5" 
                  fill="#818CF8" 
                  fillOpacity={0.3}
                  name="Revenue ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Ticket Sales</h3>
            <select className="border rounded-md px-3 py-1.5 text-sm text-gray-700">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                  name="Tickets Sold"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* Upcoming Events */}
      <AnimatedCard>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-900">View All</button>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} • {event.registrations} registrations
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {Math.round((event.registrations / event.capacity) * 100)}% Full
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.capacity - event.registrations} spots left
                  </div>
                </div>
                {event.status === 'attention' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}