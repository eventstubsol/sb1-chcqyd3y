import React from 'react';
import { Calendar, MapPin, Users, DollarSign, Mail } from 'lucide-react';
import { EventFormData } from '../QuickStartWizard';
import { LoadingSpinner } from '../../../common';

interface PreviewStepProps {
  data: EventFormData;
  onPublish: () => void;
  onSaveAsDraft: () => void;
  saving: boolean;
}

export default function PreviewStep({ data, onPublish, onSaveAsDraft, saving }: PreviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Preview & Publish</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review your event details before publishing
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">{data.basicInfo.name}</h2>
          <p className="mt-2 text-gray-600">{data.basicInfo.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(data.basicInfo.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{data.basicInfo.eventType}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-5 w-5 mr-2" />
              <span>{data.attendance.expectedCount} attendees</span>
            </div>
            <div className="flex items-center text-gray-500">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{data.access.isPaid ? `$${data.access.basePrice}` : 'Free'}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
            <div className="flex items-center text-gray-500">
              <Mail className="h-5 w-5 mr-2" />
              <span>{data.contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onSaveAsDraft}
          disabled={saving}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {saving ? (
            <>
              <LoadingSpinner size="sm" />
              <span className="ml-2">Saving...</span>
            </>
          ) : (
            'Save as Draft'
          )}
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {saving ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Publishing...</span>
            </>
          ) : (
            'Publish Event'
          )}
        </button>
      </div>
    </div>
  );
}