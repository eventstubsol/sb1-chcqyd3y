import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Settings, Shield, FileText, Activity, 
  Database, Search, MessageSquare, Building, Brain, Flag, Link2, Archive,
  Key, Globe, Zap, LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OverviewTab from './OverviewTab';
import TenantsTab from './TenantsTab';
import EventsTab from './EventsTab';
import AnalyticsTab from './AnalyticsTab';
import AiInsightsTab from './AiInsightsTab';
import PlansTab from './PlansTab';
import ResourcesTab from './ResourcesTab';
import SearchTab from './SearchTab';
import SupportTab from './SupportTab';
import ContentModerationTab from './ContentModerationTab';
import IntegrationsTab from './IntegrationsTab';
import BackupTab from './BackupTab';
import SecurityTab from './SecurityTab';
import AuditTab from './AuditTab';
import SettingsTab from './SettingsTab';
import ApiManagementTab from './ApiManagementTab';

const MENU_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tenant-management', label: 'Tenant Management', icon: Building },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain },
  { id: 'plans', label: 'Plans & Billing', icon: Zap },
  { id: 'resources', label: 'Resources', icon: Database },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'content-moderation', label: 'Content Moderation', icon: Flag },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'backup', label: 'Backup & Recovery', icon: Archive },
  { id: 'api', label: 'API Management', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'audit', label: 'Audit Log', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function SuperAdminDashboard() {
  const { returnToTab, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(returnToTab || 'overview');

  useEffect(() => {
    if (returnToTab) {
      setActiveTab(returnToTab);
    }
  }, [returnToTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'tenant-management':
        return <TenantsTab />;
      case 'events':
        return <EventsTab searchQuery="" />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'ai-insights':
        return <AiInsightsTab />;
      case 'plans':
        return <PlansTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'search':
        return <SearchTab />;
      case 'support':
        return <SupportTab />;
      case 'content-moderation':
        return <ContentModerationTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'backup':
        return <BackupTab />;
      case 'api':
        return <ApiManagementTab />;
      case 'security':
        return <SecurityTab />;
      case 'audit':
        return <AuditTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <nav className="flex-1 overflow-y-auto py-4">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              {MENU_ITEMS.find(item => item.id === activeTab)?.label || 'Overview'}
            </h1>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}