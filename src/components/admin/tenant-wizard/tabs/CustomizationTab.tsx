import React from 'react';
import { FormInput, FormSelect } from '../../../../components/common';
import { Palette, Globe, Clock } from 'lucide-react';

interface CustomizationData {
  brandLogo?: string;
  customDomain?: string;
  primaryColor: string;
  language: string;
  timeZone: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
  };
}

interface CustomizationTabProps {
  data: CustomizationData;
  onChange: (data: CustomizationData) => void;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' }
];

const TIMEZONES = Intl.supportedValuesOf('timeZone').map(zone => ({
  value: zone,
  label: zone.replace(/_/g, ' ')
}));

export default function CustomizationTab({ data, onChange }: CustomizationTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Customization Settings</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure branding and localization settings for the tenant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Custom Domain"
          type="text"
          value={data.customDomain || ''}
          onChange={(value) => onChange({ ...data, customDomain: value })}
          icon={Globe}
          placeholder="app.yourdomain.com"
        />

        <FormInput
          label="Primary Brand Color"
          type="text"
          value={data.primaryColor}
          onChange={(value) => onChange({ ...data, primaryColor: value })}
          icon={Palette}
          placeholder="#4F46E5"
        />

        <FormSelect
          label="Language"
          value={data.language}
          onChange={(value) => onChange({ ...data, language: value })}
          options={LANGUAGES}
          required
        />

        <FormSelect
          label="Time Zone"
          value={data.timeZone}
          onChange={(value) => onChange({ ...data, timeZone: value })}
          options={TIMEZONES}
          required
          icon={Clock}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Notification Preferences
          </label>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.notificationPreferences.email}
                onChange={(e) => onChange({
                  ...data,
                  notificationPreferences: {
                    ...data.notificationPreferences,
                    email: e.target.checked
                  }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Email Notifications</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.notificationPreferences.sms}
                onChange={(e) => onChange({
                  ...data,
                  notificationPreferences: {
                    ...data.notificationPreferences,
                    sms: e.target.checked
                  }
                })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">SMS Notifications</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Globe className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Custom domain settings will be configured after tenant creation. DNS records will need to be updated to point to our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}