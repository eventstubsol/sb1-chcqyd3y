import React, { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { AnimatedCard } from '../common';

interface PaymentMethodsProps {
  tenantId: string;
}

export default function PaymentMethods({ tenantId }: PaymentMethodsProps) {
  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      brand: 'visa',
      isDefault: true
    }
  ]);

  return (
    <AnimatedCard>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-500">Manage your payment methods</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center">
              <CreditCard className={`h-8 w-8 ${
                method.isDefault ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expMonth}/{method.expYear}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {method.isDefault ? (
                <span className="text-sm text-indigo-600 font-medium">Default</span>
              ) : (
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Set as default
                </button>
              )}
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Your payment information is securely stored and processed by Stripe.
        </p>
      </div>
    </AnimatedCard>
  );
}