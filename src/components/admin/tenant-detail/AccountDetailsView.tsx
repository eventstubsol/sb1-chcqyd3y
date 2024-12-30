import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface AccountDetailsViewProps {
  tenant: any;
}

export default function AccountDetailsView({ tenant }: AccountDetailsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Details</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">Subscription Plan</dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{tenant.subscription?.plan}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Billing Cycle</dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{tenant.subscription?.billingCycle}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Account Creation Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(tenant.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Next Renewal Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(tenant.subscription?.endDate).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Monthly Cost
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${tenant.subscription?.price}
            </dd>
          </div>
        </dl>
      </AnimatedCard>
    </div>
  );
}