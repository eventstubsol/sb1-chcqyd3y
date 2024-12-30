import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import { AnimatedCard } from '../../common';

export default function ReportsTab() {
  const reports = [
    {
      id: '1',
      name: 'Sales Summary',
      description: 'Overview of ticket sales and revenue',
      lastGenerated: '2024-03-15T10:30:00Z',
      type: 'sales'
    },
    {
      id: '2',
      name: 'Attendee Demographics',
      description: 'Detailed breakdown of attendee information',
      lastGenerated: '2024-03-14T15:45:00Z',
      type: 'analytics'
    },
    {
      id: '3',
      name: 'Financial Statement',
      description: 'Detailed financial report including all transactions',
      lastGenerated: '2024-03-13T09:20:00Z',
      type: 'financial'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
            <p className="text-sm text-gray-500">Create custom reports for your events</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            New Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Sales Report</option>
              <option>Attendee Report</option>
              <option>Financial Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Format</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
      </AnimatedCard>

      {/* Available Reports */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Available Reports</h3>
          <div className="flex items-center gap-4">
            <select className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="all">All Types</option>
              <option value="sales">Sales</option>
              <option value="analytics">Analytics</option>
              <option value="financial">Financial</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500">{report.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last generated: {new Date(report.lastGenerated).toLocaleString()}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-900">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}