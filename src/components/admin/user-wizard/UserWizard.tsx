import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import WizardTabs from './WizardTabs';
import BasicInfoTab from './tabs/BasicInfoTab';
import ContactInfoTab from './tabs/ContactInfoTab';
import RolePermissionsTab from './tabs/RolePermissionsTab';
import SecurityTab from './tabs/SecurityTab';
import PreferencesTab from './tabs/PreferencesTab';
import ActivityTab from './tabs/ActivityTab';
import AdditionalInfoTab from './tabs/AdditionalInfoTab';
import { LoadingSpinner } from '../../common';
import { useToast } from '../../../contexts/ToastContext';

const TABS = [
  { id: 'basic', label: 'Basic Information' },
  { id: 'contact', label: 'Contact Information' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'security', label: 'Security Settings' },
  { id: 'preferences', label: 'User Preferences' },
  { id: 'activity', label: 'Activity & Usage' },
  { id: 'additional', label: 'Additional Info' }
];

interface UserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  mode?: 'create' | 'edit' | 'view';
  tenant?: any;
  onSubmit: (data: any) => Promise<void>;
}

const defaultFormData = {
  basic: {
    fullName: '',
    email: '',
    username: '',
    profilePicture: undefined
  },
  contact: {
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    alternativeEmail: ''
  },
  roles: {
    role: 'user',
    customPermissions: []
  },
  security: {
    password: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    recoveryEmail: '',
    securityQuestions: []
  },
  preferences: {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notifications: {
      email: true,
      sms: false,
      inApp: true
    }
  },
  activity: {},
  additional: {
    bio: '',
    skills: [],
    socialLinks: {},
    notes: ''
  }
};

export default function UserWizard({
  isOpen,
  onClose,
  initialData,
  mode = 'create',
  tenant,
  onSubmit
}: UserWizardProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData
      });
    }
  }, [initialData]);

  const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === TABS.length - 1;
  const isViewMode = mode === 'view';

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
      showToast('success', `User ${mode === 'create' ? 'created' : 'updated'} successfully`);
      onClose();
    } catch (error) {
      showToast('error', `Failed to ${mode} user`);
      console.error('Error submitting user data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <BasicInfoTab
            data={formData.basic}
            onChange={data => setFormData({ ...formData, basic: data })}
            disabled={isViewMode}
          />
        );
      case 'contact':
        return (
          <ContactInfoTab
            data={formData.contact}
            onChange={data => setFormData({ ...formData, contact: data })}
            readOnly={isViewMode}
          />
        );
      case 'roles':
        return (
          <RolePermissionsTab
            data={formData.roles}
            onChange={data => setFormData({ ...formData, roles: data })}
            disabled={isViewMode}
          />
        );
      case 'security':
        return (
          <SecurityTab
            data={formData.security}
            onChange={data => setFormData({ ...formData, security: data })}
            readOnly={isViewMode}
          />
        );
      case 'preferences':
        return (
          <PreferencesTab
            data={formData.preferences}
            onChange={data => setFormData({ ...formData, preferences: data })}
            disabled={isViewMode}
          />
        );
      case 'activity':
        return (
          <ActivityTab
            data={formData.activity}
            onChange={data => setFormData({ ...formData, activity: data })}
            readOnly={isViewMode}
          />
        );
      case 'additional':
        return (
          <AdditionalInfoTab
            data={formData.additional}
            onChange={data => setFormData({ ...formData, additional: data })}
            disabled={isViewMode}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const progressPercentage = ((currentTabIndex + 1) / TABS.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-scale-in">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Create New User' : mode === 'edit' ? 'Edit User' : 'View User'}
            </h2>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
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
            disabled={isFirstTab || isSubmitting}
            className={`
              flex items-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isFirstTab || isSubmitting
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
              {isViewMode ? 'Close' : 'Cancel'}
            </button>

            {!isViewMode && (
              isLastTab ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    mode === 'create' ? 'Create User' : 'Save Changes'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}