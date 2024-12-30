import React from 'react';
import { FormInput, FormSelect } from '../../../../components/common';
import { Globe, Bell, Clock } from 'lucide-react';

interface PreferencesData {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  theme?: 'light' | 'dark' | 'system';
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
}

interface PreferencesTabProps {
  data: PreferencesData;
  onChange: (data: PreferencesData) => void;
  disabled?: boolean;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' }
];

const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System Default' }
];

const TIME_FORMATS = [
  { value: '12h', label: '12-hour' },
  { value: '24h', label: '24-hour' }
];

const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
];

export default function PreferencesTab({ data, onChange, disabled = false }: PreferencesTabProps) {
  const timezones = Intl.supportedValuesOf('timeZone').map(zone => ({
    value: zone,
    label: zone.replace(/_/g, ' ')
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">User Preferences</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure display and notification preferences for the user.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Language"
          value={data.language}
          onChange={(value) => onChange({ ...data, language: value })}
          options={LANGUAGES}
          icon={Globe}
          disabled={disabled}
        />

        <FormSelect
          label="Time Zone"
          value={data.timezone}
          onChange={(value) => onChange({ ...data, timezone: value })}
          options={timezones}
          icon={Clock}
          disabled={disabled}
        />

        <FormSelect
          label="Theme"
          value={data.theme || 'system'}
          onChange={(value) => onChange({ ...data, theme: value as 'light' | 'dark' | 'system' })}
          options={THEMES}
          disabled={disabled}
        />

        <FormSelect
          label="Time Format"
          value={data.timeFormat || '12h'}
          onChange={(value) => onChange({ ...data, timeFormat: value as '12h' | '24h' })}
          options={TIME_FORMATS}
          icon={Clock}
          disabled={disabled}
        />

        <FormSelect
          label="Date Format"
          value={data.dateFormat || 'MM/DD/YYYY'}
          onChange={(value) => onChange({ ...data, dateFormat: value })}
          options={DATE_FORMATS}
          icon={Calendar}
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-500" />
            <span>Notification Preferences</span>
          </div>
        </label>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.notifications.email}
              onChange={(e) => onChange({
                ...data,
                notifications: {
                  ...data.notifications,
                  email: e.target.checked
                }
              })}
              disabled={disabled}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Email Notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.notifications.sms}
              onChange={(e) => onChange({
                ...data,
                notifications: {
                  ...data.notifications,
                  sms: e.target.checked
                }
              })}
              disabled={disabled}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">SMS Notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.notifications.inApp}
              onChange={(e) => onChange({
                ...data,
                notifications: {
                  ...data.notifications,
                  inApp: e.target.checked
                }
              })}
              disabled={disabled}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">In-App Notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
}