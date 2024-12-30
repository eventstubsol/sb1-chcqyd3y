import React from 'react';
import { FormInput } from '../../../../components/common';
import { Database, Upload, Zap, Calendar } from 'lucide-react';

interface QuotasData {
  eventCount: number;
  storage: number;
  bandwidth: number;
  apiCalls: number;
}

interface QuotasTabProps {
  data: QuotasData;
  onChange: (data: QuotasData) => void;
}

export default function QuotasTab({ data, onChange }: QuotasTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Event & Resource Quotas</h3>
        <p className="text-sm text-gray-500 mb-4">
          Set resource limits and quotas for this tenant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Maximum Events"
          type="number"
          value={data.eventCount.toString()}
          onChange={(value) => onChange({ ...data, eventCount: parseInt(value) })}
          required
          icon={Calendar}
        />

        <FormInput
          label="Storage Limit (GB)"
          type="number"
          value={data.storage.toString()}
          onChange={(value) => onChange({ ...data, storage: parseInt(value) })}
          required
          icon={Database}
        />

        <FormInput
          label="Monthly Bandwidth (GB)"
          type="number"
          value={data.bandwidth.toString()}
          onChange={(value) => onChange({ ...data, bandwidth: parseInt(value) })}
          required
          icon={Upload}
        />

        <FormInput
          label="Monthly API Calls"
          type="number"
          value={data.apiCalls.toString()}
          onChange={(value) => onChange({ ...data, apiCalls: parseInt(value) })}
          required
          icon={Zap}
        />
      </div>

      {/* Usage Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Resource Usage Preview</h4>
        <div className="space-y-4">
          {[
            { label: 'Events', value: data.eventCount, max: 100 },
            { label: 'Storage', value: data.storage, max: 1000 },
            { label: 'Bandwidth', value: data.bandwidth, max: 1000 },
            { label: 'API Calls', value: data.apiCalls, max: 10000 }
          ].map((resource) => (
            <div key={resource.label}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{resource.label}</span>
                <span>{resource.value} / {resource.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(resource.value / resource.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Database className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Resource quotas are tied to the subscription plan. Changes to these limits may affect billing.
              Monitoring and alerts will be set up automatically when approaching quota limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}