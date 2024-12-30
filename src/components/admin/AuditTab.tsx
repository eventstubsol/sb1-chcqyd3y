import React from 'react';
import { Clock, User, Shield, AlertTriangle } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
  ipAddress: string;
}

export default function AuditTab() {
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'User Impersonation',
      performedBy: 'admin@eventhub.com',
      timestamp: '2024-03-15T10:30:00Z',
      details: 'Impersonated user john@example.com',
      severity: 'warning',
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      action: 'Payment Settings Updated',
      performedBy: 'admin@eventhub.com',
      timestamp: '2024-03-15T09:15:00Z',
      details: 'Updated Stripe API keys',
      severity: 'critical',
      ipAddress: '192.168.1.1'
    },
    {
      id: '3',
      action: 'User Suspended',
      performedBy: 'admin@eventhub.com',
      timestamp: '2024-03-14T16:45:00Z',
      details: 'Suspended user due to violation',
      severity: 'warning',
      ipAddress: '192.168.1.1'
    }
  ];

  const getSeverityBadgeColor = (severity: AuditLog['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">System Audit Log</h3>
            <p className="text-sm text-gray-500">Track all administrative actions and system changes</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Export Logs
          </button>
        </div>

        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div key={log.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(log.severity)}`}>
                      {log.severity.toUpperCase()}
                    </span>
                    <span className="font-medium text-gray-900">{log.action}</span>
                  </div>
                  <p className="text-sm text-gray-600">{log.details}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {log.performedBy}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      {log.ipAddress}
                    </div>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Log Retention Period</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive alerts for critical actions</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Extended Logging</p>
              <p className="text-sm text-gray-500">Log additional system events</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}