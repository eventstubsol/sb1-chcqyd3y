import React from 'react';
import { FormInput, FormSelect } from '../../../../components/common';
import { CreditCard, Building2 } from 'lucide-react';

interface BillingData {
  billingContactName: string;
  billingContactEmail: string;
  billingAddress: string;
  paymentMethod: string;
  vatId?: string;
}

interface BillingTabProps {
  data: BillingData;
  onChange: (data: BillingData) => void;
}

const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'paypal', label: 'PayPal' }
];

export default function BillingTab({ data, onChange }: BillingTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Billing & Payment Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure billing contacts and payment details for this tenant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Billing Contact Name"
          value={data.billingContactName}
          onChange={(value) => onChange({ ...data, billingContactName: value })}
          required
          icon={Building2}
        />

        <FormInput
          label="Billing Contact Email"
          type="email"
          value={data.billingContactEmail}
          onChange={(value) => onChange({ ...data, billingContactEmail: value })}
          required
          icon={CreditCard}
        />

        <div className="col-span-2">
          <FormInput
            label="Billing Address"
            value={data.billingAddress}
            onChange={(value) => onChange({ ...data, billingAddress: value })}
            required
            icon={Building2}
          />
        </div>

        <FormSelect
          label="Payment Method"
          value={data.paymentMethod}
          onChange={(value) => onChange({ ...data, paymentMethod: value })}
          options={PAYMENT_METHODS}
          required
        />

        <FormInput
          label="VAT/Tax ID"
          value={data.vatId || ''}
          onChange={(value) => onChange({ ...data, vatId: value })}
          placeholder="Optional"
          icon={CreditCard}
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Invoice History</h4>
        <p className="text-sm text-gray-500">
          Invoice history will be available after tenant creation.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CreditCard className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Payment method details and billing cycle changes will be configurable in the tenant settings after creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}