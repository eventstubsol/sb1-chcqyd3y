import React, { useState } from 'react';
import { Shield, Key, Lock, AlertTriangle } from 'lucide-react';

export default function SecurityTab() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 12,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    maxAge: 90
  });

  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      timestamp: '2024-03-08 14:30:00'
    },
    {
      id: 2,
      type: 'critical',
      message: 'Unusual API usage pattern detected for tenant XYZ',
      timestamp: '2024-03-08 13:15:00'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Save Changes
        </button>
      </div>

      {/* Authentication Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Key className="h-5 w-5 mr-2" />
          Authentication Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div>
              <h4 className="font-medium text-gray-900">Single Sign-On (SSO)</h4>
              <p className="text-sm text-gray-600">Enable SSO integration for enterprise clients</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={ssoEnabled}
                onChange={(e) => setSsoEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Password Policy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Length</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={passwordPolicy.minLength}
              onChange={(e) => setPasswordPolicy({...passwordPolicy, minLength: parseInt(e.target.value)})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Age (days)</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={passwordPolicy.maxAge}
              onChange={(e) => setPasswordPolicy({...passwordPolicy, maxAge: parseInt(e.target.value)})}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={passwordPolicy.requireSpecialChar}
              onChange={(e) => setPasswordPolicy({...passwordPolicy, requireSpecialChar: e.target.checked})}
            />
            <label className="text-sm text-gray-700">Require Special Character</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={passwordPolicy.requireNumber}
              onChange={(e) => setPasswordPolicy({...passwordPolicy, requireNumber: e.target.checked})}
            />
            <label className="text-sm text-gray-700">Require Number</label>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Recent Security Alerts
        </h3>
        
        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-md ${
                alert.type === 'critical' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{alert.message}</p>
                <span className="text-sm">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}