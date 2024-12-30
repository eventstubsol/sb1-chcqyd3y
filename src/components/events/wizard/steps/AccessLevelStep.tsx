import React from 'react';
import { Lock, DollarSign } from 'lucide-react';

interface AccessLevelData {
  isPublic: boolean;
  isPaid: boolean;
  basePrice?: number;
}

interface AccessLevelStepProps {
  data: AccessLevelData;
  onChange: (data: Partial<AccessLevelData>) => void;
}

export default function AccessLevelStep({ data, onChange }: AccessLevelStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Access & Pricing</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure who can view and attend your event
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="font-medium text-gray-900">Event Visibility</p>
              <p className="text-sm text-gray-500">Control who can see your event</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.isPublic}
              onChange={(e) => onChange({ isPublic: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="font-medium text-gray-900">Paid Event</p>
              <p className="text-sm text-gray-500">Charge attendees for tickets</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.isPaid}
              onChange={(e) => onChange({ isPaid: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {data.isPaid && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">Base Ticket Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.basePrice || ''}
                onChange={(e) => onChange({ basePrice: parseFloat(e.target.value) })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}