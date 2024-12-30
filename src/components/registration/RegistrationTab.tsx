import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Users, AlertTriangle } from 'lucide-react';

export default function RegistrationTab() {
  const navigate = useNavigate();

  const stats = {
    totalForms: 24,
    totalSubmissions: 740,
    completionRate: 82,
    abandonedRate: 15,
  };

  const forms = [
    {
      id: 1,
      name: 'Conference Registration 2024',
      submissions: 245,
      completionRate: 82,
      lastUpdated: '2024-03-15',
    },
    {
      id: 2,
      name: 'Workshop Sign-up Form',
      submissions: 128,
      completionRate: 75,
      lastUpdated: '2024-03-14',
    },
    {
      id: 3,
      name: 'Early Bird Registration',
      submissions: 367,
      completionRate: 91,
      lastUpdated: '2024-03-13',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Registration Forms</h1>
        <button
          onClick={() => navigate('/forms/create')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create New Form
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Forms</p>
              <p className="text-2xl font-semibold">{stats.totalForms}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <BarChart className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Submissions</p>
              <p className="text-2xl font-semibold">{stats.totalSubmissions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-semibold">{stats.completionRate}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abandoned Rate</p>
              <p className="text-2xl font-semibold">{stats.abandonedRate}%</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Registration Forms
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {forms.map((form) => (
            <div key={form.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {form.submissions} submissions • {form.completionRate}%
                    completion rate
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Edit
                  </button>
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">
                    View Submissions
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Last updated {form.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
