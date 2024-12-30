import React from 'react';
import {
  Building2,
  Phone,
  Users,
  CreditCard,
  Settings,
  Palette,
  Database,
  Shield,
  BarChart2,
  Headphones,
  FileText
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
}

interface WizardTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function WizardTabs({ tabs, activeTab, onTabChange }: WizardTabsProps) {
  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case 'basic':
        return Building2;
      case 'contact':
      case 'contacts':
        return Phone;
      case 'account':
        return Settings;
      case 'billing':
        return CreditCard;
      case 'users':
        return Users;
      case 'customization':
        return Palette;
      case 'quotas':
        return Database;
      case 'security':
        return Shield;
      case 'usage':
        return BarChart2;
      case 'support':
        return Headphones;
      case 'misc':
        return FileText;
      default:
        return Building2;
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 overflow-y-auto">
      <nav className="space-y-1 p-4">
        {tabs.map((tab) => {
          const Icon = getTabIcon(tab.id);
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
                transition-all duration-200 ease-in-out
                ${isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-indigo-500' : 'text-gray-400'
                }`}
              />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}