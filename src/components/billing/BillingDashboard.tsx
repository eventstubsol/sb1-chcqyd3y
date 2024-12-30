import React from 'react';
import { CreditCard, Calendar, AlertTriangle, DollarSign } from 'lucide-react';
import { AnimatedCard } from '../common';
import BillingOverview from './BillingOverview';
import InvoiceHistory from './InvoiceHistory';
import PaymentMethods from './PaymentMethods';
import SubscriptionDetails from './SubscriptionDetails';

interface BillingDashboardProps {
  tenantId: string;
}

export default function BillingDashboard({ tenantId }: BillingDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Billing Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">$2,499.00</p>
              <p className="mt-1 text-sm text-green-600">Paid through April 2024</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Payment</p>
              <p className="text-2xl font-bold text-gray-900">$499.00</p>
              <p className="mt-1 text-sm text-gray-600">Due Apr 1, 2024</p>
            </div>
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Method</p>
              <p className="text-2xl font-bold text-gray-900">•••• 4242</p>
              <p className="mt-1 text-sm text-gray-600">Expires 12/2025</p>
            </div>
            <CreditCard className="h-8 w-8 text-indigo-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Subscription Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
              <p className="mt-1 text-sm text-gray-600">Enterprise Plan</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-green-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BillingOverview tenantId={tenantId} />
          <div className="mt-6">
            <InvoiceHistory tenantId={tenantId} />
          </div>
        </div>
        
        <div className="space-y-6">
          <SubscriptionDetails tenantId={tenantId} />
          <PaymentMethods tenantId={tenantId} />
        </div>
      </div>
    </div>
  );
}