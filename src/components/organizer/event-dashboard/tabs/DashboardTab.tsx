import React from 'react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';
import { 
  Users, Ticket, DollarSign, Calendar, TrendingUp, 
  MessageSquare, Globe, MapPin, Mail, Building2 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface DashboardTabProps {
  event: Event;
}

const salesData = [
  { date: '2024-01', tickets: 45, revenue: 2250 },
  { date: '2024-02', tickets: 65, revenue: 3250 },
  { date: '2024-03', tickets: 85, revenue: 4250 },
  { date: '2024-04', tickets: 95, revenue: 4750 }
];

const attendeeSourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Social Media', value: 300 },
  { name: 'Email', value: 200 },
  { name: 'Partners', value: 100 }
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function DashboardTab({ event }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$14,500</p>
              <p className="mt-1 text-sm text-green-600">+12% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
              <p className="text-2xl font-bold text-gray-900">290</p>
              <p className="mt-1 text-sm text-green-600">58% of capacity</p>
            </div>
            <Ticket className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Registered Attendees</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="mt-1 text-sm text-green-600">85% check-in rate</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Days Until Event</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="mt-1 text-sm text-green-600">All on schedule</p>
            </div>
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Revenue Trend */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales & Revenue Trend</h3>
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
                  dataKey="tickets"
                  stroke="#4F46E5"
                  fill="#818CF8"
                  fillOpacity={0.3}
                  name="Tickets"
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

        {/* Attendee Sources */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendee Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendeeSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {attendeeSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { icon: Ticket, text: '2 tickets purchased by John Doe', time: '5m ago' },
              { icon: Mail, text: 'New email campaign sent', time: '1h ago' },
              { icon: Users, text: 'New exhibitor registration', time: '2h ago' },
              { icon: Globe, text: 'Website content updated', time: '3h ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <activity.icon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Key Metrics */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Email Open Rate</span>
              <span className="text-sm font-medium text-gray-900">68.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="text-sm font-medium text-gray-900">12.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Ticket Value</span>
              <span className="text-sm font-medium text-gray-900">${event.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Social Shares</span>
              <span className="text-sm font-medium text-gray-900">1,234</span>
            </div>
          </div>
        </AnimatedCard>

        {/* Upcoming Tasks */}
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {[
              { text: 'Send reminder emails', due: '2 days' },
              { text: 'Finalize venue setup', due: '3 days' },
              { text: 'Brief staff members', due: '4 days' },
              { text: 'Review catering order', due: '5 days' }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{task.text}</span>
                <span className="text-xs text-gray-400">Due in {task.due}</span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}