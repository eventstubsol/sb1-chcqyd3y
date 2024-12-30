import React from 'react';
import { Calendar, Users, BarChart } from 'lucide-react';

const mockForms = [
  {
    id: '1',
    name: 'Conference Registration 2024',
    submissions: 245,
    completionRate: 82,
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    name: 'Workshop Sign-up Form',
    submissions: 128,
    completionRate: 75,
    lastUpdated: '2024-03-14'
  },
  {
    id: '3',
    name: 'Early Bird Registration',
    submissions: 367,
    completionRate: 91,
    lastUpdated: '2024-03-13'
  },
  {
    id: '4',
    name: 'VIP Access Registration',
    submissions: 89,
    completionRate: 88,
    lastUpdated: '2024-03-12'
  }
];

export function RegistrationList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Registration Forms</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {mockForms.map((form) => (
          <div key={form.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{form.name}</h3>
                <div className="mt-2 flex items-center space-x-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {form.submissions} submissions
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BarChart className="w-4 h-4 mr-1" />
                    {form.completionRate}% completion
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Updated {form.lastUpdated}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  View Submissions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}