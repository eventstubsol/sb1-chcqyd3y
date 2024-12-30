import React, { useState } from 'react';
import { 
  ArrowLeft, LayoutDashboard, Users, Ticket, Calendar, Bell, Settings, 
  BarChart2, MessageSquare, Globe, FileText, UserCheck, Building2,
  Users2, Share2, Smartphone, Printer, BadgeCheck, Network, PieChart
} from 'lucide-react';
import { Event } from '../../../types';
import { AnimatedCard } from '../../common';
import EventOverview from './tabs/EventOverview';
import AttendeesTab from './tabs/AttendeesTab';
import TicketsTab from './tabs/TicketsTab';
import AgendaTab from './tabs/AgendaTab';
import NotificationsTab from './tabs/NotificationsTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import RegistrationTab from './tabs/RegistrationTab';
import WebsiteTab from './tabs/WebsiteTab';
import MobileAppTab from './tabs/MobileAppTab';
import CheckInTab from './tabs/CheckInTab';
import ExhibitorsTab from './tabs/ExhibitorsTab';
import NetworkingTab from './tabs/NetworkingTab';
import EmailsTab from './tabs/EmailsTab';
import DashboardTab from './tabs/DashboardTab';

interface EventDashboardProps {
  event: Event;
  onBack: () => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: PieChart },
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'attendees', label: 'Attendees', icon: Users },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'registration', label: 'Registration', icon: FileText },
  { id: 'emails', label: 'Emails', icon: MessageSquare },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'mobile-app', label: 'Mobile App', icon: Smartphone },
  { id: 'check-in', label: 'Check-In', icon: BadgeCheck },
  { id: 'exhibitors', label: 'Exhibitors', icon: Building2 },
  { id: 'networking', label: 'Networking', icon: Network },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function EventDashboard({ event, onBack }: EventDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab event={event} />;
      case 'overview':
        return <EventOverview event={event} />;
      case 'attendees':
        return <AttendeesTab event={event} />;
      case 'tickets':
        return <TicketsTab event={event} />;
      case 'registration':
        return <RegistrationTab event={event} />;
      case 'emails':
        return <EmailsTab event={event} />;
      case 'website':
        return <WebsiteTab event={event} />;
      case 'agenda':
        return <AgendaTab event={event} />;
      case 'mobile-app':
        return <MobileAppTab event={event} />;
      case 'check-in':
        return <CheckInTab event={event} />;
      case 'exhibitors':
        return <ExhibitorsTab event={event} />;
      case 'networking':
        return <NetworkingTab event={event} />;
      case 'notifications':
        return <NotificationsTab event={event} />;
      case 'analytics':
        return <AnalyticsTab event={event} />;
      case 'settings':
        return <SettingsTab event={event} />;
      default:
        return <DashboardTab event={event} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{event.location}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                event.status === 'upcoming'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
          </div>

          <nav className="px-2 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md mb-1 transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}