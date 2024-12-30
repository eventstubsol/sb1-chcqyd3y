import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';
import { AnimatedCard } from '../../common';

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,678</p>
              <p className="mt-1 text-sm text-green-600">+23% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ticket Sales</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="mt-1 text-sm text-green-600">+15% from last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">2,567</p>
              <p className="mt-1 text-sm text-green-600">+18% from last month</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">68.5%</p>
              <p className="mt-1 text-sm text-green-600">+2.1% from last month</p>
            </div>
            <BarChart2 className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
            <select className="border rounded-md px-3 py-1.5 text-sm text-gray-700">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue Chart Coming Soon</p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Ticket Sales</h3>
            <select className="border rounded-md px-3 py-1.5 text-sm text-gray-700">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Sales Chart Coming Soon</p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}