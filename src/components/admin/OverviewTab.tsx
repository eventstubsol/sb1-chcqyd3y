import React from 'react';
import { 
  Users, Building, CreditCard, TrendingUp, Activity, BarChart2,
  Globe, Clock, AlertTriangle, DollarSign, UserCheck, Calendar,
  ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 450000, lastYear: 380000 },
  { month: 'Feb', revenue: 520000, lastYear: 420000 },
  { month: 'Mar', revenue: 580000, lastYear: 460000 },
  { month: 'Apr', revenue: 620000, lastYear: 500000 },
  { month: 'May', revenue: 690000, lastYear: 550000 },
  { month: 'Jun', revenue: 750000, lastYear: 600000 }
];

const userGrowthData = [
  { month: 'Jan', users: 8000, active: 6800 },
  { month: 'Feb', users: 9500, active: 8075 },
  { month: 'Mar', users: 11000, active: 9350 },
  { month: 'Apr', users: 12500, active: 10625 },
  { month: 'May', users: 13800, active: 11730 },
  { month: 'Jun', users: 15000, active: 12750 }
];

const eventMetricsData = [
  { month: 'Jan', events: 120, attendees: 3600 },
  { month: 'Feb', events: 150, attendees: 4500 },
  { month: 'Mar', events: 180, attendees: 5400 },
  { month: 'Apr', events: 210, attendees: 6300 },
  { month: 'May', events: 240, attendees: 7200 },
  { month: 'Jun', events: 270, attendees: 8100 }
];

const revenueBreakdown = [
  { name: 'Event Tickets', value: 60 },
  { name: 'Subscriptions', value: 25 },
  { name: 'Add-ons', value: 15 }
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$750,000</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <p className="text-sm text-green-600">+15.3% from last month</p>
              </div>
            </div>
            <DollarSign className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">12,750</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <p className="text-sm text-green-600">+8.7% from last month</p>
              </div>
            </div>
            <Users className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">270</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
            </div>
            <Calendar className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">68.5%</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <p className="text-sm text-green-600">+2.1% from last month</p>
              </div>
            </div>
            <Zap className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Revenue and User Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Growth</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">This Year</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">Last Year</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F46E5" 
                  fill="#818CF8" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="lastYear" 
                  stroke="#9CA3AF" 
                  fill="#E5E7EB" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">Total Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Event Metrics and Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Event Metrics</h3>
            <Activity className="h-5 w-5 text-gray-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="events" fill="#4F46E5" />
                <Bar yAxisId="right" dataKey="attendees" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Breakdown</h3>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Key Performance Indicators</h3>
          <BarChart2 className="h-5 w-5 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
            <p className="text-2xl font-semibold text-gray-900">24m</p>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Feature Adoption</p>
            <p className="text-2xl font-semibold text-gray-900">78%</p>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">+5% from last month</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
            <p className="text-2xl font-semibold text-gray-900">4.8/5</p>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">+0.2 from last month</p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Support Response Time</p>
            <p className="text-2xl font-semibold text-gray-900">1.5h</p>
            <div className="flex items-center mt-1">
              <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">-15min from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}