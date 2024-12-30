import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Users, TrendingUp, 
  Tag, FileText, Settings, PlusCircle, LogOut,
  Bell, BarChart2, Globe, MessageSquare, Layers
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ImpersonationBanner from '../ImpersonationBanner';
import QuickStartWizard, { EventFormData } from '../events/wizard/QuickStartWizard';
import { useToast } from '../../contexts/ToastContext';
import { AnimatedCard } from '../common';
import {
  OverviewTab,
  EventsTab,
  AnalyticsTab,
  AttendeesTab,
  PromotionsTab,
  ReportsTab,
  SettingsTab,
  MarketingTab,
  SponsorsTab,
  ContentTab,
  IntegrationsTab,
  SupportTab
} from './tabs';

const MENU_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'attendees', label: 'Attendees', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'marketing', label: 'Marketing', icon: Globe },
  { id: 'sponsors', label: 'Sponsors', icon: Tag },
  { id: 'content', label: 'Content', icon: Layers },
  { id: 'promotions', label: 'Promotions', icon: Tag },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'integrations', label: 'Integrations', icon: BarChart2 },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function OrganizerDashboard() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWizard, setShowWizard] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New ticket sale for Tech Conference 2024', time: '5m ago' },
    { id: 2, message: 'Event promotion campaign ended', time: '1h ago' },
    { id: 3, message: 'New sponsor inquiry received', time: '2h ago' }
  ]);

  const handleCreateEvent = async (data: EventFormData, publish: boolean) => {
    try {
      // Here we would normally save the event data to the backend
      console.log('Event Data:', data);
      console.log('Published:', publish);
      
      showToast('success', `Event ${publish ? 'published' : 'saved as draft'} successfully!`);
      setShowWizard(false);
      setActiveTab('events');
    } catch (error) {
      console.error('Error creating event:', error);
      showToast('error', 'Failed to create event. Please try again.');
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
      case 'marketing':
        return <MarketingTab />;
      case 'sponsors':
        return <SponsorsTab />;
      case 'content':
        return <ContentTab />;
      case 'promotions':
        return <PromotionsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'support':
        return <SupportTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ImpersonationBanner />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Event Organizer</h2>
                <p className="text-sm text-gray-500 mt-1">{user?.organizationName}</p>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => setShowWizard(true)}
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Event
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 py-4">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
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

          {/* Notifications Panel */}
          <AnimatedCard className="mx-4 mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 bg-indigo-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {MENU_ITEMS.find(item => item.id === activeTab)?.label || 'Overview'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString(undefined, { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Quick Start Wizard Modal */}
      {showWizard && (
        <QuickStartWizard
          onClose={() => setShowWizard(false)}
          onSave={handleCreateEvent}
        />
      )}
    </div>
  );
}