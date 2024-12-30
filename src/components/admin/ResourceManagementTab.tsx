import React, { useState } from 'react';
import { HardDrive, Database, Activity, RefreshCw, Download, BarChart2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const resourceData = [
  { time: '00:00', cpu: 45, memory: 62, storage: 58 },
  { time: '04:00', cpu: 52, memory: 65, storage: 60 },
  { time: '08:00', cpu: 78, memory: 82, storage: 65 },
  { time: '12:00', cpu: 85, memory: 88, storage: 68 },
  { time: '16:00', cpu: 65, memory: 72, storage: 70 },
  { time: '20:00', cpu: 58, memory: 68, storage: 72 }
];

export default function ResourceManagementTab() {
  const [autoScaling, setAutoScaling] = useState({
    enabled: true,
    minInstances: 2,
    maxInstances: 10,
    targetCPU: 70,
    targetMemory: 80
  });

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">CPU Usage</h4>
            <Activity className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">78%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">4 cores active</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Memory Usage</h4>
            <Database className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">82%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">13.1 GB / 16 GB</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Storage Usage</h4>
            <HardDrive className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">65%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">650 GB / 1 TB</p>
        </div>
      </div>

      {/* Resource Monitoring */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Resource Monitoring</h3>
            <p className="text-sm text-gray-500">24-hour resource utilization</p>
          </div>
          <select className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#4F46E5" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#10B981" name="Memory %" />
              <Line type="monotone" dataKey="storage" stroke="#F59E0B" name="Storage %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Auto-Scaling Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Auto-Scaling Configuration</h3>
            <p className="text-sm text-gray-500">Configure automatic resource scaling</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">Auto-scaling</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoScaling.enabled}
                onChange={(e) => setAutoScaling({ ...autoScaling, enabled: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Instances</label>
              <input
                type="number"
                min="1"
                value={autoScaling.minInstances}
                onChange={(e) => setAutoScaling({ ...autoScaling, minInstances: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Instances</label>
              <input
                type="number"
                min="1"
                value={autoScaling.maxInstances}
                onChange={(e) => setAutoScaling({ ...autoScaling, maxInstances: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Target CPU Utilization (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={autoScaling.targetCPU}
                onChange={(e) => setAutoScaling({ ...autoScaling, targetCPU: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Memory Utilization (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={autoScaling.targetMemory}
                onChange={(e) => setAutoScaling({ ...autoScaling, targetMemory: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scaling History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Scaling History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instances
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-03-15 14:30
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Scale Up
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  High CPU utilization (85%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2 → 3
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}