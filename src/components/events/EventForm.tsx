import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Clock, Image as ImageIcon, Tag, Globe } from 'lucide-react';
import { Event } from '../../types';
import { FormInput, FormSelect } from '../common';
import VenueSection from './sections/VenueSection';
import TicketTypesSection from './sections/TicketTypesSection';
import StaffSection from './sections/StaffSection';
import BrandingSection from './sections/BrandingSection';
import IntegrationsSection from './sections/IntegrationsSection';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: Partial<Event>) => Promise<void>;
  mode?: 'create' | 'edit';
}

const EVENT_TYPES = [
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'concert', label: 'Concert' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'networking', label: 'Networking' }
];

export default function EventForm({ initialData, onSubmit, mode = 'create' }: EventFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Event>>(initialData || {});
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', icon: Calendar },
    { id: 2, title: 'Venue & Location', icon: MapPin },
    { id: 3, title: 'Tickets & Pricing', icon: Tag },
    { id: 4, title: 'Staff & Team', icon: Users },
    { id: 5, title: 'Branding', icon: Globe },
    { id: 6, title: 'Integrations', icon: Tag }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormInput
              label="Event Title"
              value={formData.title || ''}
              onChange={(value) => setFormData({ ...formData, title: value })}
              required
              placeholder="Enter event title"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Event Type"
                value={formData.type || ''}
                onChange={(value) => setFormData({ ...formData, type: value })}
                options={EVENT_TYPES}
                required
              />

              <FormInput
                label="Event Date"
                type="datetime-local"
                value={formData.date || ''}
                onChange={(value) => setFormData({ ...formData, date: value })}
                required
                icon={Calendar}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Describe your event"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Banner
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return <VenueSection formData={formData} onChange={setFormData} />;

      case 3:
        return <TicketTypesSection formData={formData} onChange={setFormData} />;

      case 4:
        return <StaffSection formData={formData} onChange={setFormData} />;

      case 5:
        return <BrandingSection formData={formData} onChange={setFormData} />;

      case 6:
        return <IntegrationsSection formData={formData} onChange={setFormData} />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex items-center ${
                  step.id < steps.length ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id <= currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {step.id < steps.length && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div key={step.id} className="text-sm text-gray-500">
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStepContent()}

        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}