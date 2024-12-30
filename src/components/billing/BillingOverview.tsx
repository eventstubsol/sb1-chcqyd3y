import React from 'react';
import { BarChart2, TrendingUp, Download } from 'lucide-react';
import { AnimatedCard } from '../common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BillingOverviewProps {
  tenantId: string;
}

const billingData = [
  { month: 'Jan', amount: 2499 },
  { month: 'Feb', amount: 2499 },
  { month: 'Mar', amount: 2499 },
  { month: 'Apr', amount: 2999 },
  { month: 'May', amount: 2999 },
  { month: 'Jun', amount: 2999 }
];

export default function BillingOverview({ tenantId }: BillingOverviewProps) {
  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Billing Overview</h3>
          <p className="text-sm text-gray-500">6-month billing history</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`$${value}`, 'Amount']}
              contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <BarChart2 className="h-6 w-6 text-indigo-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Average Monthly Bill</p>
            <p className="text-2xl font-semibold text-gray-900">$2,749.00</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">YoY Growth</p>
            <p className="text-2xl font-semibold text-gray-900">+20.5%</p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}