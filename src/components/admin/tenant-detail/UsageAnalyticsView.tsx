import React from 'react';
import { Activity, Users, Calendar, TrendingUp } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface UsageAnalyticsViewProps {
  tenant: any;
}

export default function UsageAnalyticsView({ tenant }: UsageAnalyticsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {tenant.users?.length || 0}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events Created
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {tenant.events?.length || 0}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              API Usage
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {tenant.usage?.apiCalls || 0}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Growth Rate
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-green-600">
              +15%
            </dd>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}