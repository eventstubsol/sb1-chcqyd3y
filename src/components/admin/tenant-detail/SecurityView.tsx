import React from 'react';
import { Shield, Key, Lock } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface SecurityViewProps {
  tenant: any;
}

export default function SecurityView({ tenant }: SecurityViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Two-Factor Authentication
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Key className="h-4 w-4" />
              SSO Integration
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.ssoEnabled ? 'Configured' : 'Not Configured'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password Policy
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.passwordPolicy || 'Standard'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Compliance Standards
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.complianceStandards?.join(', ') || 'None'}
            </dd>
          </div>
        </dl>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Access Control</h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">IP Whitelist</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.ipWhitelist?.length || 0} addresses configured
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Session Timeout</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.security?.sessionTimeout || '30'} minutes
            </dd>
          </div>
        </dl>
      </AnimatedCard>
    </div>
  );
}