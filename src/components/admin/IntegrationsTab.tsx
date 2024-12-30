import React, { useState } from 'react';
import { Link2, Key, RefreshCw, Check, X } from 'lucide-react';
import { integrationService } from '../../services/IntegrationService';

interface Integration {
  id: string;
  name: string;
  type: 'crm' | 'payment' | 'email' | 'analytics';
  status: 'active' | 'inactive';
  lastSync?: string;
}

export default function IntegrationsTab() {
  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Stripe',
      type: 'payment',
      status: 'active',
      lastSync: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Mailchimp',
      type: 'email',
      status: 'active',
      lastSync: '2024-03-15T09:45:00Z'
    }
  ]);

  const [apiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_**********************',
      created: '2024-03-01T00:00:00Z',
      lastUsed: '2024-03-15T10:30:00Z'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
            <p className="text-sm text-gray-500">Manage API access credentials</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Generate New Key
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{key.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-gray-600">{key.key}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(key.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(key.lastUsed).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">Revoke</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Active Integrations</h3>
            <p className="text-sm text-gray-500">Manage third-party service connections</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Integration
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Link2 className="h-6 w-6 text-gray-400 mr-2" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {integration.status === 'active' ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-400">
                      <X className="h-5 w-5 mr-1" />
                      Disconnected
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                </div>
                <button className="text-indigo-600 hover:text-indigo-900">Configure</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Webhooks</h3>
            <p className="text-sm text-gray-500">Manage event notifications</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Webhook
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            No webhooks configured. Add a webhook endpoint to receive real-time event notifications.
          </p>
        </div>
      </div>
    </div>
  );
}