import React, { useState } from 'react';
import { Smartphone, Settings, Bell, Users, Layout, Palette, Toggle, Save } from 'lucide-react';
import { Event } from '../../../../types';
import { AnimatedCard } from '../../../common';

interface MobileAppTabProps {
  event: Event;
}

interface AppSettings {
  theme: {
    primaryColor: string;
    darkMode: boolean;
  };
  features: {
    id: string;
    name: string;
    enabled: boolean;
    description: string;
  }[];
  notifications: {
    pushEnabled: boolean;
    reminderTime: number;
  };
}

export default function MobileAppTab({ event }: MobileAppTabProps) {
  const [settings, setSettings] = useState<AppSettings>({
    theme: {
      primaryColor: '#4F46E5',
      darkMode: false
    },
    features: [
      {
        id: 'agenda',
        name: 'Event Agenda',
        enabled: true,
        description: 'View and personalize event schedule'
      },
      {
        id: 'networking',
        name: 'Attendee Networking',
        enabled: true,
        description: 'Connect with other attendees'
      },
      {
        id: 'maps',
        name: 'Venue Maps',
        enabled: true,
        description: 'Interactive venue navigation'
      },
      {
        id: 'qr',
        name: 'QR Check-in',
        enabled: true,
        description: 'Contactless event check-in'
      }
    ],
    notifications: {
      pushEnabled: true,
      reminderTime: 30
    }
  });

  const handleSaveSettings = () => {
    console.log('Saving app settings:', settings);
  };

  const toggleFeature = (featureId: string) => {
    setSettings(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === featureId
          ? { ...feature, enabled: !feature.enabled }
          : feature
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* App Preview */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Mobile App Preview</h3>
          <button
            onClick={handleSaveSettings}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-72 h-[600px] bg-gray-100 rounded-3xl p-4 relative">
            <div className="w-32 h-8 bg-black absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-2xl" />
            <div className="w-full h-full bg-white rounded-2xl p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="h-12 bg-indigo-600 rounded-lg" style={{ backgroundColor: settings.theme.primaryColor }} />
                <div className="h-24 bg-gray-100 rounded-lg" />
                <div className="h-16 bg-gray-100 rounded-lg" />
                <div className="h-16 bg-gray-100 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Theme Settings */}
      <AnimatedCard>
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Theme Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="color"
                value={settings.theme.primaryColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  theme: { ...prev.theme, primaryColor: e.target.value }
                }))}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <input
                type="text"
                value={settings.theme.primaryColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  theme: { ...prev.theme, primaryColor: e.target.value }
                }))}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dark Mode</label>
            <div className="mt-1">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.theme.darkMode}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      theme: { ...prev.theme, darkMode: e.target.checked }
                    }))}
                    className="sr-only"
                  />
                  <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                  <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform transform ${
                    settings.theme.darkMode ? 'translate-x-4' : 'translate-x-0'
                  } shadow`}></div>
                </div>
                <span className="ml-3 text-sm text-gray-700">Enable Dark Mode</span>
              </label>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Features */}
      <AnimatedCard>
        <div className="flex items-center space-x-2 mb-4">
          <Layout className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">App Features</h3>
        </div>

        <div className="space-y-4">
          {settings.features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={feature.enabled}
                    onChange={() => toggleFeature(feature.id)}
                    className="sr-only"
                  />
                  <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                  <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform transform ${
                    feature.enabled ? 'translate-x-4' : 'translate-x-0'
                  } shadow`}></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Notifications */}
      <AnimatedCard>
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.notifications.pushEnabled}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, pushEnabled: e.target.checked }
                  }))}
                  className="sr-only"
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform transform ${
                  settings.notifications.pushEnabled ? 'translate-x-4' : 'translate-x-0'
                } shadow`}></div>
              </div>
              <span className="ml-3 text-sm text-gray-700">Enable Push Notifications</span>
            </label>
          </div>

          {settings.notifications.pushEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Reminder Time (minutes before)
              </label>
              <select
                value={settings.notifications.reminderTime}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, reminderTime: Number(e.target.value) }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          )}
        </div>
      </AnimatedCard>
    </div>
  );
}