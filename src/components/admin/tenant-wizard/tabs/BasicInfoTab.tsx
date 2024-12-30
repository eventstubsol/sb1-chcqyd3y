import React from 'react';
import { FormInput, FormSelect } from '../../../../components/common';
import { Building2, Globe } from 'lucide-react';

interface BasicInfoData {
  name: string;
  industry: string;
  domain?: string;
  description?: string;
}

interface BasicInfoTabProps {
  data: BasicInfoData;
  onChange: (data: BasicInfoData) => void;
}

const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' }
];

export default function BasicInfoTab({ data, onChange }: BasicInfoTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Basic Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the basic details about the tenant organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Organization Name"
          value={data.name}
          onChange={(value) => onChange({ ...data, name: value })}
          required
          icon={Building2}
          placeholder="Enter organization name"
        />

        <FormSelect
          label="Industry"
          value={data.industry}
          onChange={(value) => onChange({ ...data, industry: value })}
          options={INDUSTRIES}
          required
        />

        <div className="col-span-2">
          <FormInput
            label="Domain"
            value={data.domain || ''}
            onChange={(value) => onChange({ ...data, domain: value })}
            icon={Globe}
            placeholder="example.com"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Brief description of the organization..."
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Building2 className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              The organization name and industry are required fields. The domain will be used to create a unique subdomain for the tenant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}