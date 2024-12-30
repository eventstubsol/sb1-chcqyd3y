import React, { useState } from 'react';
import { HardDrive, Database, Activity, RefreshCw, Download, BarChart2 } from 'lucide-react';
import { AnimatedCard } from '../common';

export default function ResourcesTab() {
  const [resourceMetrics] = useState({
    cpu: 78,
    memory: 82,
    storage: 65,
    bandwidth: 250,
    activeConnections: 1250,
    responseTime: 120
  });

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">CPU Usage</h4>
            <Activity className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resourceMetrics.cpu}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${resourceMetrics.cpu}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">4 cores active</p>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Memory Usage</h4>
            <Database className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resourceMetrics.memory}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${resourceMetrics.memory}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">13.1 GB / 16 GB</p>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Storage Usage</h4>
            <HardDrive className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resourceMetrics.storage}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${resourceMetrics.storage}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">650 GB / 1 TB</p>
        </AnimatedCard>
      </div>

      {/* Performance Metrics */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
            <p className="text-sm text-gray-500">Real-time system performance</p>
          </div>
          <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            <Download className="h-4 w-4 mr-2" />
            Export Metrics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Bandwidth Usage</span>
              <RefreshCw className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{resourceMetrics.bandwidth} MB/s</p>
            <p className="text-sm text-green-600">+5% from average</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Active Connections</span>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{resourceMetrics.activeConnections}</p>
            <p className="text-sm text-green-600">Normal load</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Response Time</span>
              <BarChart2 className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{resourceMetrics.responseTime}ms</p>
            <p className="text-sm text-green-600">-15ms from average</p>
          </div>
        </div>
      </AnimatedCard>

      {/* Resource Allocation */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Resource Allocation</h3>
            <p className="text-sm text-gray-500">Distribution across tenants</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Tenant A</span>
              <span className="text-sm text-gray-600">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Tenant B</span>
              <span className="text-sm text-gray-600">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Tenant C</span>
              <span className="text-sm text-gray-600">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}