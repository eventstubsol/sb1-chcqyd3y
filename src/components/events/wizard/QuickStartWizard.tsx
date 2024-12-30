import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatedCard, LoadingSpinner } from '../../common';
import BasicInfoStep from './steps/BasicInfoStep';
import AccessLevelStep from './steps/AccessLevelStep';
import AttendanceStep from './steps/AttendanceStep';
import BrandingStep from './steps/BrandingStep';
import ContactStep from './steps/ContactStep';
import PreviewStep from './steps/PreviewStep';

export interface EventFormData {
  basicInfo: {
    name: string;
    description: string;
    eventType: 'virtual' | 'in-person' | 'hybrid';
    startDate: string;
    endDate: string;
    timezone: string;
    isMultiDay: boolean;
  };
  access: {
    isPublic: boolean;
    isPaid: boolean;
    basePrice?: number;
  };
  attendance: {
    expectedCount: number;
  };
  branding: {
    logo?: File;
    themeColor: string;
  };
  contact: {
    name: string;
    email: string;
  };
}

interface QuickStartWizardProps {
  onClose: () => void;
  onSave: (data: EventFormData, publish: boolean) => Promise<void>;
  isSubmitting?: boolean;
}

const STEPS = [
  { id: 'basic', title: 'Event Basics' },
  { id: 'access', title: 'Access & Pricing' },
  { id: 'attendance', title: 'Expected Attendance' },
  { id: 'branding', title: 'Basic Branding' },
  { id: 'contact', title: 'Contact Info' },
  { id: 'preview', title: 'Preview & Publish' }
];

export default function QuickStartWizard({ onClose, onSave, isSubmitting = false }: QuickStartWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EventFormData>({
    basicInfo: {
      name: '',
      description: '',
      eventType: 'in-person',
      startDate: '',
      endDate: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      isMultiDay: false
    },
    access: {
      isPublic: true,
      isPaid: false
    },
    attendance: {
      expectedCount: 0
    },
    branding: {
      themeColor: '#4F46E5'
    },
    contact: {
      name: '',
      email: ''
    }
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'basic':
        return (
          <BasicInfoStep
            data={formData.basicInfo}
            onChange={data => setFormData({ ...formData, basicInfo: { ...formData.basicInfo, ...data } })}
          />
        );
      case 'access':
        return (
          <AccessLevelStep
            data={formData.access}
            onChange={data => setFormData({ ...formData, access: { ...formData.access, ...data } })}
          />
        );
      case 'attendance':
        return (
          <AttendanceStep
            data={formData.attendance}
            onChange={data => setFormData({ ...formData, attendance: { ...formData.attendance, ...data } })}
          />
        );
      case 'branding':
        return (
          <BrandingStep
            data={formData.branding}
            onChange={data => setFormData({ ...formData, branding: { ...formData.branding, ...data } })}
          />
        );
      case 'contact':
        return (
          <ContactStep
            data={formData.contact}
            onChange={data => setFormData({ ...formData, contact: { ...formData.contact, ...data } })}
          />
        );
      case 'preview':
        return (
          <PreviewStep
            data={formData}
            onPublish={() => onSave(formData, true)}
            onSaveAsDraft={() => onSave(formData, false)}
            saving={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <AnimatedCard className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="flex-1 p-6 overflow-y-auto">
          {renderStep()}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className={`
              flex items-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${currentStep === 0 || isSubmitting
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          {currentStep < STEPS.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </AnimatedCard>
    </div>
  );
}