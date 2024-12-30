import React from 'react';
import { Activity, Shield, AlertTriangle, Settings } from 'lucide-react';

interface AnalyticsTabProps {
  stats?: {
    totalRevenue: number;
    ticketsSold: number;
    conversionRate: number;
    monthlyActiveUsers: number;
  };
}

const defaultStats = {
  totalRevenue: 750000,
  ticketsSold: 15000,
  conversionRate: 68,
  monthlyActiveUsers: 25000
};

export default function AnalyticsTab({ stats = defaultStats }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Analytics</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tickets Sold</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.ticketsSold.toLocaleString()}</p>
            <p className="text-sm text-green-600">+8.3% from last month</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.conversionRate}%</p>
            <p className="text-sm text-green-600">+1.2% from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Analytics</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Monthly Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.monthlyActiveUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600">+5.7% from last month</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">New Registrations</p>
            <p className="text-2xl font-semibold text-gray-900">125</p>
            <p className="text-sm text-green-600">+15.2% from last month</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User Retention</p>
            <p className="text-2xl font-semibold text-gray-900">78.5%</p>
            <p className="text-sm text-green-600">+2.1% from last month</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Events</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium text-gray-900">Summer Music Festival {i}</p>
                <p className="text-sm text-gray-500">1,200 tickets sold</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$36,000</p>
                <p className="text-sm text-green-600">98% sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}