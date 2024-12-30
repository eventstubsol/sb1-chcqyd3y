import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Settings, Shield, FileText, Activity, 
  Database, Search, MessageSquare, Building, Brain, Flag, Link2, Archive,
  Key, Globe, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import OverviewTab from './admin/OverviewTab';
import EventsTab from './admin/EventsTab';
import SettingsTab from './admin/SettingsTab';
import SecurityTab from './admin/SecurityTab';
import AuditTab from './admin/AuditTab';
import AnalyticsTab from './admin/AnalyticsTab';
import ResourceManagementTab from './admin/ResourceManagementTab';
import SearchTab from './admin/SearchTab';
import SupportTab from './admin/SupportTab';
import TenantsTab from './admin/TenantsTab';
import AiInsightsTab from './admin/AiInsightsTab';
import ContentModerationTab from './admin/ContentModerationTab';
import IntegrationsTab from './admin/IntegrationsTab';
import BackupTab from './admin/BackupTab';
import ApiManagementTab from './admin/ApiManagementTab';
import PlansTab from './admin/PlansTab';
import ImpersonationBanner from './ImpersonationBanner';

export default function SuperAdminDashboard() {
  const { returnToTab } = useAuth();
  const [activeTab, setActiveTab] = useState(returnToTab || 'overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Update active tab when returning from impersonation
  useEffect(() => {
    if (returnToTab) {
      setActiveTab(returnToTab);
    }
  }, [returnToTab]);

  const stats = {
    totalRevenue: 750000,
    ticketsSold: 15000,
    conversionRate: 68,
    monthlyActiveUsers: 25000
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'tenants':
        return <TenantsTab />;
      case 'events':
        return <EventsTab searchQuery={searchTerm} />;
      case 'analytics':
        return <AnalyticsTab stats={stats} />;
      case 'ai-insights':
        return <AiInsightsTab />;
      case 'security':
        return <SecurityTab />;
      case 'audit':
        return <AuditTab />;
      case 'resources':
        return <ResourceManagementTab />;
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
      case 'plans':
        return <PlansTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tenants', label: 'Tenant Management', icon: Building },
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

  return (
    <div className="min-h-screen bg-gray-100">
      <ImpersonationBanner />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}