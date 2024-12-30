import React from 'react';
import { Calendar, Clock, Globe } from 'lucide-react';
import { FormInput, FormSelect } from '../../../common';

interface BasicInfoData {
  name: string;
  description: string;
  eventType: 'virtual' | 'in-person' | 'hybrid';
  startDate: string;
  endDate: string;
  timezone: string;
  isMultiDay: boolean;
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  onChange: (data: Partial<BasicInfoData>) => void;
}

const EVENT_TYPES = [
  { value: 'in-person', label: 'In-Person Event' },
  { value: 'virtual', label: 'Virtual Event' },
  { value: 'hybrid', label: 'Hybrid Event' }
];

export default function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const timezones = Intl.supportedValuesOf('timeZone').map(zone => ({
    value: zone,
    label: zone.replace(/_/g, ' ')
  }));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Event Basics</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start by providing the essential details about your event.
        </p>
      </div>

      <FormInput
        label="Event Name"
        value={data.name}
        onChange={(value) => onChange({ name: value })}
        placeholder="Enter a clear, descriptive name for your event"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Event Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Briefly describe your event (optional)"
        />
      </div>

      <FormSelect
        label="Event Type"
        value={data.eventType}
        onChange={(value) => onChange({ eventType: value as 'virtual' | 'in-person' | 'hybrid' })}
        options={EVENT_TYPES}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              value={data.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              value={data.endDate}
              onChange={(e) => onChange({ endDate: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <FormSelect
        label="Time Zone"
        value={data.timezone}
        onChange={(value) => onChange({ timezone: value })}
        options={timezones}
        icon={Globe}
        required
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="multiDay"
          checked={data.isMultiDay}
          onChange={(e) => onChange({ isMultiDay: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="multiDay" className="ml-2 block text-sm text-gray-900">
          This is a multi-day event
        </label>
      </div>
    </div>
  );
}