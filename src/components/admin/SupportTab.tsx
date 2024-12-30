import React, { useState } from 'react';
import { MessageSquare, Users, Clock, BarChart2, HelpCircle, Search } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  assignedTo?: string;
}

export default function SupportTab() {
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      subject: 'Cannot access analytics dashboard',
      description: 'Getting 403 error when trying to access analytics',
      status: 'open',
      priority: 'high',
      createdAt: '2024-03-15T10:30:00Z',
      updatedAt: '2024-03-15T10:30:00Z',
      tenantId: '1',
      assignedTo: 'support1'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Open Tickets</h4>
            <MessageSquare className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500">+3 from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Avg Response Time</h4>
            <Clock className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">2.5h</p>
          <p className="text-sm text-green-500">-30min from avg</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Resolution Rate</h4>
            <BarChart2 className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">94%</p>
          <p className="text-sm text-green-500">+2% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Customer Satisfaction</h4>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">4.8/5</p>
          <p className="text-sm text-green-500">+0.2 from last month</p>
        </div>
      </div>

      {/* Knowledge Base Quick Access */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
            <p className="text-sm text-gray-500">Quick access to help articles and guides</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Article
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <HelpCircle className="h-6 w-6 text-indigo-600 mb-2" />
            <h4 className="font-medium text-gray-900">Getting Started Guide</h4>
            <p className="text-sm text-gray-500 mt-1">Basic platform setup and configuration</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <HelpCircle className="h-6 w-6 text-indigo-600 mb-2" />
            <h4 className="font-medium text-gray-900">API Documentation</h4>
            <p className="text-sm text-gray-500 mt-1">Complete API reference and examples</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <HelpCircle className="h-6 w-6 text-indigo-600 mb-2" />
            <h4 className="font-medium text-gray-900">Troubleshooting</h4>
            <p className="text-sm text-gray-500 mt-1">Common issues and solutions</p>
          </div>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Support Tickets</h3>
            <p className="text-sm text-gray-500">Manage and track support requests</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                      <div className="text-sm text-gray-500">{ticket.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                    <button className="text-green-600 hover:text-green-900">Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Chat Integration */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
            <p className="text-sm text-gray-500">Real-time customer support</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">5 agents online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Active Chats</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900">John from Acme Corp</p>
                  <p className="text-xs text-gray-500">Duration: 5m 23s</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-900">Join</button>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Queue</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-900">Sarah from TechCorp</p>
                  <p className="text-xs text-gray-500">Waiting: 1m 45s</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-900">Accept</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}