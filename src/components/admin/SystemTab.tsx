import React, { useState } from 'react';
import { 
  Server, Database, HardDrive, RefreshCw, Download, Upload, 
  AlertTriangle, Activity, Globe, Settings, Shield, FileText,
  Zap, BarChart2, Clock, Bell
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  activeConnections: number;
  responseTime: number;
  uptime: string;
  apiCalls: number;
  errorRate: number;
  bandwidth: string;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export default function SystemTab() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'incidents' | 'resources'>('overview');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 68,
    disk: 72,
    activeConnections: 234,
    responseTime: 120,
    uptime: '99.99%',
    apiCalls: 15000,
    errorRate: 0.05,
    bandwidth: '250 MB/s'
  });

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'error',
      message: 'High CPU usage detected on primary server',
      timestamp: new Date().toISOString(),
      status: 'active'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Unusual spike in API calls from tenant XYZ',
      timestamp: new Date().toISOString(),
      status: 'active'
    }
  ]);

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Server Load</h4>
            <Server className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900">{systemMetrics.cpu}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    systemMetrics.cpu > 80 ? 'bg-red-600' : 
                    systemMetrics.cpu > 60 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${systemMetrics.cpu}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">{systemMetrics.memory}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    systemMetrics.memory > 80 ? 'bg-red-600' : 
                    systemMetrics.memory > 60 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${systemMetrics.memory}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Disk Usage</span>
                <span className="text-sm font-medium text-gray-900">{systemMetrics.disk}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    systemMetrics.disk > 80 ? 'bg-red-600' : 
                    systemMetrics.disk > 60 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${systemMetrics.disk}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Performance</h4>
            <Activity className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-medium text-gray-900">{systemMetrics.responseTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Connections</span>
              <span className="text-sm font-medium text-gray-900">{systemMetrics.activeConnections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-gray-900">{systemMetrics.errorRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bandwidth</span>
              <span className="text-sm font-medium text-gray-900">{systemMetrics.bandwidth}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">API Usage</h4>
            <Zap className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Calls (24h)</span>
              <span className="text-sm font-medium text-gray-900">{systemMetrics.apiCalls}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-medium text-gray-900">99.95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Latency</span>
              <span className="text-sm font-medium text-gray-900">85ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">Active Alerts</h4>
          <Bell className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50' :
                alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">{alert.message}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health Score */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">System Health Score</h4>
          <BarChart2 className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-900">92/100</div>
            <p className="text-sm text-gray-500">Overall system health is good</p>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm font-medium text-gray-900">95/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reliability</span>
                <span className="text-sm font-medium text-gray-900">90/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security</span>
                <span className="text-sm font-medium text-gray-900">94/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-6">
      {/* Automated Tasks */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Automated Workflows</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Daily Backup</p>
              <p className="text-sm text-gray-500">Next run in 4 hours</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Usage Report Generation</p>
              <p className="text-sm text-gray-500">Runs weekly on Sunday</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Task Queue */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Task Queue</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">New Tenant Onboarding</p>
              <p className="text-sm text-gray-500">Acme Corp - Started 5 minutes ago</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidentsTab = () => (
    <div className="space-y-6">
      {/* Active Incidents */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Active Incidents</h4>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.type === 'error' ? 'bg-red-100 text-red-800' :
                  alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.type.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-900">{alert.message}</p>
              <div className="mt-2 flex items-center space-x-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-900">
                  View Details
                </button>
                <button className="text-sm text-green-600 hover:text-green-900">
                  Mark as Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Incident History</h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                RESOLVED
              </span>
              <span className="text-sm text-gray-500">
                2024-03-14 15:30:00
              </span>
            </div>
            <p className="text-gray-900">Database connection timeout</p>
            <p className="text-sm text-gray-500 mt-1">
              Resolution: Connection pool settings adjusted
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-6">
      {/* Resource Allocation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation</h4>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Storage Usage</span>
              <span className="text-sm font-medium text-gray-900">1.2 TB / 2 TB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Bandwidth Usage</span>
              <span className="text-sm font-medium text-gray-900">250 MB/s / 500 MB/s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Resource Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">Storage by Tenant</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tenant A</span>
                <span className="text-sm font-medium text-gray-900">500 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tenant B</span>
                <span className="text-sm font-medium text-gray-900">300 GB</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">Bandwidth by Region</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">North America</span>
                <span className="text-sm font-medium text-gray-900">150 MB/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Europe</span>
                <span className="text-sm font-medium text-gray-900">100 MB/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks & Workflows
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'incidents'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Incidents
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'resources'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'tasks' && renderTasksTab()}
      {activeTab === 'incidents' && renderIncidentsTab()}
      {activeTab === 'resources' && renderResourcesTab()}
    </div>
  );
}