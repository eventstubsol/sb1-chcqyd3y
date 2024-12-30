import React from 'react';
import { Database, Upload, Zap, Calendar } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface QuotasViewProps {
  tenant: any;
}

export default function QuotasView({ tenant }: QuotasViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Quotas</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Limit
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.settings?.eventLimit || 'Unlimited'} events
            </dd>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(tenant.events?.length / tenant.settings?.eventLimit) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Storage Limit
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.settings?.storageLimit || 0} GB
            </dd>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(tenant.usage?.storageUsed / tenant.settings?.storageLimit) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Bandwidth Limit
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.settings?.bandwidthLimit || 0} GB/month
            </dd>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(tenant.usage?.bandwidthUsed / tenant.settings?.bandwidthLimit) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              API Calls
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.settings?.apiLimit || 0} calls/month
            </dd>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(tenant.usage?.apiCalls / tenant.settings?.apiLimit) * 100}%` }}
              />
            </div>
          </div>
        </dl>
      </AnimatedCard>
    </div>
  );
}