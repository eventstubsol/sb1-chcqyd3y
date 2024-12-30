import React from 'react';
import { Palette, Globe, Clock, Bell } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface CustomizationViewProps {
  tenant: any;
}

export default function CustomizationView({ tenant }: CustomizationViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedCard>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customization Settings</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Custom Domain
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.domain}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Brand Colors
            </dt>
            <dd className="mt-1 flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: tenant.customization?.primaryColor }}
              />
              <span className="text-sm text-gray-900">{tenant.customization?.primaryColor}</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Zone
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{tenant.settings?.timezone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenant.settings?.notificationPreferences?.email ? 'Email, ' : ''}
              {tenant.settings?.notificationPreferences?.sms ? 'SMS' : ''}
            </dd>
          </div>
        </dl>
      </AnimatedCard>
    </div>
  );
}