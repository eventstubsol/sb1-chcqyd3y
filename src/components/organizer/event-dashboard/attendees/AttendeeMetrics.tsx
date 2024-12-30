import React from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendeeMetricsProps {
  event: Event;
  attendees: any[];
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function AttendeeMetrics({ event, attendees }: AttendeeMetricsProps) {
  // Mock data for charts
  const registrationData = [
    { date: '2024-01', registrations: 45 },
    { date: '2024-02', registrations: 65 },
    { date: '2024-03', registrations: 85 },
    { date: '2024-04', registrations: 95 }
  ];

  const ticketTypeData = [
    { name: 'VIP', value: 30 },
    { name: 'Early Bird', value: 45 },
    { name: 'Regular', value: 65 },
    { name: 'Student', value: 25 }
  ];

  const registrationStatusData = [
    { status: 'Confirmed', count: 120 },
    { status: 'Pending', count: 45 },
    { status: 'Cancelled', count: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Total Registrations</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">165</p>
          <p className="mt-1 text-sm text-green-600">+12% from last week</p>
        </AnimatedCard>

        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">68.5%</p>
          <p className="mt-1 text-sm text-green-600">+5% from last event</p>
        </AnimatedCard>

        <AnimatedCard>
          <h4 className="text-sm font-medium text-gray-500">Avg. Group Size</h4>
          <p className="mt-2 text-3xl font-bold text-gray-900">2.5</p>
          <p className="mt-1 text-sm text-green-600">+0.3 from last event</p>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Ticket Type Distribution */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Registration Status */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5">
                  {registrationStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.status === 'Confirmed' ? '#10B981' :
                        entry.status === 'Pending' ? '#F59E0B' :
                        '#EF4444'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}