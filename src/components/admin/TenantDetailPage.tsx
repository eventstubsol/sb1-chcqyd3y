import React from 'react';
import { Building2, Users, CreditCard, Settings, ArrowLeft, Pencil } from 'lucide-react';
import { useTenants } from '../../contexts/TenantContext';
import UserManagementSection from './tenant/UserManagementSection';
import BillingSection from './tenant/BillingSection';
import SettingsSection from './tenant/SettingsSection';
import { AnimatedCard } from '../common';
import BasicInfoView from './tenant-detail/BasicInfoView';
import AccountDetailsView from './tenant-detail/AccountDetailsView';
import BillingView from './tenant-detail/BillingView';
import UserManagementView from './tenant-detail/UserManagementView';
import CustomizationView from './tenant-detail/CustomizationView';
import QuotasView from './tenant-detail/QuotasView';
import SecurityView from './tenant-detail/SecurityView';
import UsageAnalyticsView from './tenant-detail/UsageAnalyticsView';

interface TenantDetailPageProps {
  tenantId: string;
  onBack: () => void;
  onEdit: () => void;
}

const TABS = [
  { id: 'basic', label: 'Basic Information', icon: Building2 },
  { id: 'account', label: 'Account Details', icon: Settings },
  { id: 'billing', label: 'Billing & Payment', icon: CreditCard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'customization', label: 'Customization', icon: Settings },
  { id: 'quotas', label: 'Event & Resource Quotas', icon: Settings },
  { id: 'security', label: 'Security & Compliance', icon: Settings },
  { id: 'usage', label: 'Usage & Analytics', icon: Settings }
];

export default function TenantDetailPage({ tenantId, onBack, onEdit }: TenantDetailPageProps) {
  const { getTenantById } = useTenants();
  const [activeTab, setActiveTab] = React.useState('basic');

  const tenant = getTenantById(tenantId);

  if (!tenant) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoView tenant={tenant} />;
      case 'account':
        return <AccountDetailsView tenant={tenant} />;
      case 'billing':
        return <BillingView tenant={tenant} />;
      case 'users':
        return <UserManagementView tenant={tenant} />;
      case 'customization':
        return <CustomizationView tenant={tenant} />;
      case 'quotas':
        return <QuotasView tenant={tenant} />;
      case 'security':
        return <SecurityView tenant={tenant} />;
      case 'usage':
        return <UsageAnalyticsView tenant={tenant} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
            <p className="text-sm text-gray-500">{tenant.domain}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            tenant.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : tenant.status === 'suspended'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {tenant.status}
          </span>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Edit tenant"
          >
            <Pencil className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
}