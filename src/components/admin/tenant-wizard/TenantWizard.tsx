import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WizardTabs from './WizardTabs';
import BasicInfoTab from './tabs/BasicInfoTab';
import ContactInfoTab from './tabs/ContactInfoTab';
import MultipleContactsTab from './tabs/MultipleContactsTab';
import BillingTab from './tabs/BillingTab';
import CustomizationTab from './tabs/CustomizationTab';
import QuotasTab from './tabs/QuotasTab';
import SecurityTab from './tabs/SecurityTab';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useToast } from '../../../contexts/ToastContext';

const TABS = [
  { id: 'basic', label: 'Basic Information' },
  { id: 'contact', label: 'Contact Information' },
  { id: 'contacts', label: 'Multiple Contacts' },
  { id: 'billing', label: 'Billing & Payment' },
  { id: 'customization', label: 'Customization' },
  { id: 'quotas', label: 'Event & Resource Quotas' },
  { id: 'security', label: 'Security & Compliance' }
];

interface TenantWizardProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  mode?: 'create' | 'edit';
}

export default function TenantWizard({ onClose, onSubmit, initialData, mode = 'create' }: TenantWizardProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    basic: {
      name: initialData?.name || '',
      industry: initialData?.industry || '',
      contact: initialData?.contact || {}
    },
    contact: initialData?.contact || {},
    contacts: initialData?.contacts || [],
    billing: {
      billingContactName: initialData?.billing?.contactName || '',
      billingContactEmail: initialData?.billing?.contactEmail || '',
      billingAddress: initialData?.billing?.address || '',
      paymentMethod: initialData?.billing?.paymentMethod || '',
      vatId: initialData?.billing?.vatId || ''
    },
    customization: {
      brandLogo: initialData?.customization?.brandLogo || '',
      customDomain: initialData?.domain || '',
      primaryColor: initialData?.customization?.primaryColor || '',
      language: initialData?.settings?.language || '',
      timeZone: initialData?.settings?.timezone || '',
      notificationPreferences: initialData?.settings?.notificationPreferences || {}
    },
    quotas: {
      eventCount: initialData?.settings?.eventLimit || 0,
      storage: initialData?.settings?.storageLimit || 0,
      bandwidth: initialData?.settings?.bandwidthLimit || 0,
      apiCalls: initialData?.settings?.apiLimit || 0
    },
    security: {
      twoFactorEnabled: initialData?.security?.twoFactorEnabled || false,
      ssoEnabled: initialData?.security?.ssoEnabled || false,
      complianceSettings: initialData?.security?.complianceSettings || [],
      auditLogAccess: initialData?.security?.auditLogAccess || ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === TABS.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab(TABS[currentTabIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstTab) {
      setActiveTab(TABS[currentTabIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      showToast('success', `Tenant ${mode === 'create' ? 'created' : 'updated'} successfully`);
      onClose();
    } catch (error) {
      showToast('error', `Failed to ${mode} tenant. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (tabId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [tabId]: data
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <BasicInfoTab
            data={formData.basic}
            onChange={data => updateFormData('basic', data)}
          />
        );
      case 'contact':
        return (
          <ContactInfoTab
            data={formData.contact}
            onChange={data => updateFormData('contact', data)}
          />
        );
      case 'contacts':
        return (
          <MultipleContactsTab
            data={formData.contacts}
            onChange={data => updateFormData('contacts', data)}
          />
        );
      case 'billing':
        return (
          <BillingTab
            data={formData.billing}
            onChange={data => updateFormData('billing', data)}
          />
        );
      case 'customization':
        return (
          <CustomizationTab
            data={formData.customization}
            onChange={data => updateFormData('customization', data)}
          />
        );
      case 'quotas':
        return (
          <QuotasTab
            data={formData.quotas}
            onChange={data => updateFormData('quotas', data)}
          />
        );
      case 'security':
        return (
          <SecurityTab
            data={formData.security}
            onChange={data => updateFormData('security', data)}
          />
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentTabIndex + 1) / TABS.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-scale-in">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Add New Tenant' : 'Edit Tenant'}
          </h2>
          <div className="mt-2 relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-indigo-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          <WizardTabs
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isFirstTab}
            className={`
              flex items-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isFirstTab
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            {!isLastTab ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  mode === 'create' ? 'Create Tenant' : 'Save Changes'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}