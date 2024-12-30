import React, { useState } from 'react';
import { FileText, Download, Search, Filter } from 'lucide-react';
import { AnimatedCard, FormInput, FormSelect } from '../common';

interface InvoiceHistoryProps {
  tenantId: string;
}

const SAMPLE_INVOICES = [
  {
    id: 'INV-001',
    date: '2024-03-15',
    amount: 2499.00,
    status: 'paid',
    items: [
      { description: 'Enterprise Plan - Monthly', amount: 2299.00 },
      { description: 'Additional User Seats (5)', amount: 200.00 }
    ]
  },
  {
    id: 'INV-002',
    date: '2024-02-15',
    amount: 2499.00,
    status: 'paid',
    items: [
      { description: 'Enterprise Plan - Monthly', amount: 2299.00 },
      { description: 'Additional User Seats (5)', amount: 200.00 }
    ]
  }
];

export default function InvoiceHistory({ tenantId }: InvoiceHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Invoice History</h3>
          <p className="text-sm text-gray-500">View and download past invoices</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <FormInput
            label=""
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search invoices..."
            icon={Search}
          />
        </div>
        <div className="w-48">
          <FormSelect
            label=""
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'paid', label: 'Paid' },
              { value: 'pending', label: 'Pending' },
              { value: 'overdue', label: 'Overdue' }
            ]}
            icon={Filter}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {SAMPLE_INVOICES.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    View
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnimatedCard>
  );
}