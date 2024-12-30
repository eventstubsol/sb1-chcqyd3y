import React from 'react';
import { Shield, Users, Database, Zap } from 'lucide-react';
import { AnimatedCard } from '../common';

interface SubscriptionDetailsProps {
  tenantId: string;
}

export default function SubscriptionDetails({ tenantId }: SubscriptionDetailsProps) {
  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Subscription Details</h3>
          <p className="text-sm text-gray-500">Current plan and usage</p>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
          Change Plan
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <p className="text-sm font-medium text-gray-900">Enterprise Plan</p>
            <p className="text-sm text-gray-500">Monthly billing</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">User Seats</span>
            </div>
            <span className="text-sm font-medium text-gray-900">250 / 300</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">Storage</span>
            </div>
            <span className="text-sm font-medium text-gray-900">750GB / 1TB</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">API Calls</span>
            </div>
            <span className="text-sm font-medium text-gray-900">8.5M / 10M</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-indigo-600 mr-2" />
            <p className="text-sm text-gray-600">
              Your subscription renews on April 15, 2024
            </p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}