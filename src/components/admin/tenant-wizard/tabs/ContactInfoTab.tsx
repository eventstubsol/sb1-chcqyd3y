import React from 'react';
import { FormInput } from '../../../../components/common';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website?: string;
}

interface ContactInfoTabProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export default function ContactInfoTab({ data, onChange }: ContactInfoTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Contact Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the primary contact details for this tenant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(value) => onChange({ ...data, email: value })}
          required
          icon={Mail}
          placeholder="contact@example.com"
        />

        <FormInput
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(value) => onChange({ ...data, phone: value })}
          required
          icon={Phone}
          placeholder="+1 (555) 123-4567"
        />

        <div className="col-span-2">
          <FormInput
            label="Website"
            type="url"
            value={data.website || ''}
            onChange={(value) => onChange({ ...data, website: value })}
            icon={Globe}
            placeholder="https://example.com"
          />
        </div>

        <div className="col-span-2">
          <FormInput
            label="Address"
            value={data.address}
            onChange={(value) => onChange({ ...data, address: value })}
            required
            icon={MapPin}
            placeholder="123 Business Street"
          />
        </div>

        <FormInput
          label="City"
          value={data.city}
          onChange={(value) => onChange({ ...data, city: value })}
          required
          icon={MapPin}
          placeholder="San Francisco"
        />

        <FormInput
          label="Country"
          value={data.country}
          onChange={(value) => onChange({ ...data, country: value })}
          required
          icon={Globe}
          placeholder="United States"
        />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This contact information will be used for official communications and billing purposes. Make sure all details are accurate and up-to-date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}