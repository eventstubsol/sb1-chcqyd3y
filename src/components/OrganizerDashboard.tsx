import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Users, TrendingUp, 
  Tag, FileText, Settings, PlusCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ImpersonationBanner from './ImpersonationBanner';
import QuickStartWizard, { EventFormData } from './events/wizard/QuickStartWizard';
import { useEventCreation } from '../hooks/useEventCreation';
import {
  OverviewTab,
  EventsTab,
  AnalyticsTab,
  AttendeesTab,
  PromotionsTab,
  ReportsTab,
  SettingsTab
} from './organizer/tabs';

const MENU_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'attendees', label: 'Attendees', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'promotions', label: 'Promotions', icon: Tag },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const { loading, createEvent } = useEventCreation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWizard, setShowWizard] = useState(false);

  const handleCreateEvent = async (data: EventFormData, publish: boolean) => {
    const success = await createEvent(data, publish);
    if (success) {
      setShowWizard(false);
      setActiveTab('events'); // Switch to events tab after creation
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'events':
        return <EventsTab />;
      case 'attendees':
        return <AttendeesTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'promotions':
        return <PromotionsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ImpersonationBanner />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Event Organizer</h2>
            <p className="text-sm text-gray-500 mt-1">{user?.organizationName}</p>
          </div>

          <div className="px-4 mb-4">
            <button
              onClick={() => setShowWizard(true)}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>

          <nav className="mt-4">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {MENU_ITEMS.find(item => item.id === activeTab)?.label || 'Overview'}
            </h1>
          </div>
          {renderTabContent()}
        </div>
      </div>

      {/* Quick Start Wizard Modal */}
      {showWizard && (
        <QuickStartWizard
          onClose={() => !loading && setShowWizard(false)}
          onSave={handleCreateEvent}
          isSubmitting={loading}
        />
      )}
    </div>
  );
}