import React from 'react';
import { FormInput } from '../../../../components/common';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactData {
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  alternativeEmail?: string;
}

interface ContactInfoTabProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
  readOnly?: boolean;
}

export default function ContactInfoTab({ data, onChange, readOnly = false }: ContactInfoTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Contact Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter the user's contact details and address information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Primary Email"
          type="email"
          value={data.email}
          onChange={(value) => onChange({ ...data, email: value })}
          required
          icon={Mail}
          disabled={readOnly}
          placeholder="john@example.com"
        />

        <FormInput
          label="Alternative Email"
          type="email"
          value={data.alternativeEmail || ''}
          onChange={(value) => onChange({ ...data, alternativeEmail: value })}
          icon={Mail}
          disabled={readOnly}
          placeholder="john.alt@example.com"
        />

        <FormInput
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(value) => onChange({ ...data, phone: value })}
          required
          icon={Phone}
          disabled={readOnly}
          placeholder="+1 (555) 123-4567"
        />

        <div className="col-span-2">
          <FormInput
            label="Address"
            value={data.address || ''}
            onChange={(value) => onChange({ ...data, address: value })}
            icon={MapPin}
            disabled={readOnly}
            placeholder="123 Main St, Apt 4B"
          />
        </div>

        <FormInput
          label="City"
          value={data.city || ''}
          onChange={(value) => onChange({ ...data, city: value })}
          icon={MapPin}
          disabled={readOnly}
          placeholder="San Francisco"
        />

        <FormInput
          label="Country"
          value={data.country || ''}
          onChange={(value) => onChange({ ...data, country: value })}
          icon={MapPin}
          disabled={readOnly}
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
              The primary email will be used for account-related notifications and communications.
              Alternative email can be used as a backup for account recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}