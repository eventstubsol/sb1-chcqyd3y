import React, { useState } from 'react';
import { Activity, Shield, AlertTriangle, Settings } from 'lucide-react';

interface ApiEndpoint {
  path: string;
  method: string;
  responseTime: number;
  successRate: number;
  rateLimit: number;
  usage: number;
}

const mockEndpoints: ApiEndpoint[] = [
  {
    path: '/api/users',
    method: 'GET',
    responseTime: 85,
    successRate: 99.8,
    rateLimit: 1000,
    usage: 750
  },
  {
    path: '/api/events',
    method: 'POST',
    responseTime: 120,
    successRate: 98.5,
    rateLimit: 500,
    usage: 320
  },
  {
    path: '/api/analytics',
    method: 'GET',
    responseTime: 150,
    successRate: 99.2,
    rateLimit: 300,
    usage: 280
  }
];

const ApiManagementTab: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'monitoring' | 'settings'>('monitoring');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">API Management</h2>
        <p className="text-gray-600">
          Monitor API performance, manage rate limits, and configure security settings.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedView('monitoring')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedView === 'monitoring'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Activity className="h-5 w-5" />
            <span>Monitoring</span>
          </button>
          <button
            onClick={() => setSelectedView('settings')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedView === 'settings'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {selectedView === 'monitoring' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Requests</h3>
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">1.2M</p>
              <p className="text-sm text-gray-500 mt-2">Last 24 hours</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">99.2%</p>
              <p className="text-sm text-gray-500 mt-2">Average across all endpoints</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rate Limit Alerts</h3>
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500 mt-2">Tenants approaching limits</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Performance</h3>
              <div className="space-y-4">
                {mockEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{endpoint.path}</span>
                      <span className="text-sm text-gray-500">Avg. Response Time: {endpoint.responseTime}ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${(endpoint.usage / endpoint.rateLimit) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {endpoint.usage} / {endpoint.rateLimit} requests
                      </span>
                      <span className="text-xs text-gray-500">
                        Success Rate: {endpoint.successRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Rate Limit (requests/hour)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    defaultValue={1000}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Burst Rate Limit
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    defaultValue={2000}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Version
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>v1 (Current)</option>
                  <option>v2 (Beta)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Settings
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Enable request signing</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Enable IP whitelisting</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Enable usage analytics</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiManagementTab;