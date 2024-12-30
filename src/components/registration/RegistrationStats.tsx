import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, FileText, Users, AlertTriangle } from 'lucide-react';

const mockData = [
  { name: 'Jan', submissions: 65 },
  { name: 'Feb', submissions: 85 },
  { name: 'Mar', submissions: 73 },
  { name: 'Apr', submissions: 92 },
  { name: 'May', submissions: 78 }
];

export function RegistrationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Forms */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Forms</p>
            <h3 className="text-2xl font-bold mt-1">24</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-500">12% increase</span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Submission Rate */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Submission Rate</p>
            <h3 className="text-2xl font-bold mt-1">78.5%</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <Users className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-500">8% increase</span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Abandoned Rate */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Abandoned Rate</p>
            <h3 className="text-2xl font-bold mt-1">21.5%</h3>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-sm text-red-500">3% decrease</span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      {/* Submissions Chart */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Submission Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}