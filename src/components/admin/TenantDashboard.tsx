import React from 'react';
import { Building2, Users, CreditCard, BarChart2, TrendingUp, Clock } from 'lucide-react';
import { AnimatedCard } from '../common';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const growthData = [
  { month: 'Jan', tenants: 10, revenue: 15000 },
  { month: 'Feb', tenants: 15, revenue: 25000 },
  { month: 'Mar', tenants: 20, revenue: 35000 },
  { month: 'Apr', tenants: 28, revenue: 48000 },
  { month: 'May', tenants: 35, revenue: 65000 },
  { month: 'Jun', tenants: 45, revenue: 85000 }
];

const usageData = [
  { month: 'Jan', events: 120, users: 1500 },
  { month: 'Feb', events: 150, users: 2200 },
  { month: 'Mar', events: 180, users: 3100 },
  { month: 'Feb', events: 220, users: 3800 },
  { month: 'May', events: 250, users: 4500 },
  { month: 'Jun', events: 280, users: 5200 }
];

export default function TenantDashboard() {
  return (
    <div className="space-y-6 mb-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <div className="flex items-center mt-1 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% from last month</span>
              </div>
            </div>
            <Building2 className="h-10 w-10 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">5,234</p>
              <div className="flex items-center mt-1 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8% from last month</span>
              </div>
            </div>
            <Users className="h-10 w-10 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$85,000</p>
              <div className="flex items-center mt-1 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+15% from last month</span>
              </div>
            </div>
            <CreditCard className="h-10 w-10 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
              <p className="text-2xl font-bold text-gray-900">1.2s</p>
              <div className="flex items-center mt-1 text-green-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">-0.3s from last month</span>
              </div>
            </div>
            <BarChart2 className="h-10 w-10 text-indigo-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tenant Growth & Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="tenants"
                  stroke="#4F46E5"
                  fill="#818CF8"
                  fillOpacity={0.3}
                  name="Tenants"
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

        <AnimatedCard className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="events" fill="#4F46E5" name="Events" />
                <Bar yAxisId="right" dataKey="users" fill="#10B981" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}