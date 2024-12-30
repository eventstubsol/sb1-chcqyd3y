import React, { useState } from 'react';
import { CreditCard, Users, Package, Settings, Plus, Edit2, Trash2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  userLimit: number;
  storageLimit: number;
  active: boolean;
}

export default function PlansTab() {
  const [plans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Starter',
      price: 29,
      billingCycle: 'monthly',
      features: ['Basic event creation', '100 attendees per event', 'Email support'],
      userLimit: 5,
      storageLimit: 10,
      active: true
    },
    {
      id: '2',
      name: 'Professional',
      price: 99,
      billingCycle: 'monthly',
      features: ['Advanced analytics', 'Custom branding', 'Priority support'],
      userLimit: 20,
      storageLimit: 50,
      active: true
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Active Plans</h4>
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{plans.length}</p>
          <p className="text-sm text-gray-500">+2 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Total Subscribers</h4>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-green-500">+15% growth</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Monthly Revenue</h4>
            <CreditCard className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">$45,678</p>
          <p className="text-sm text-green-500">+23% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Active Features</h4>
            <Settings className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500">Across all plans</p>
        </div>
      </div>

      {/* Subscription Plans Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Subscription Plans</h3>
            <p className="text-sm text-gray-500">Manage your subscription plans and pricing</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{plan.name}</h4>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${plan.price}
                    <span className="text-sm text-gray-500">/{plan.billingCycle}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Features</h5>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">User limit</span>
                  <span className="text-gray-900">{plan.userLimit} users</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Storage</span>
                  <span className="text-gray-900">{plan.storageLimit}GB</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={plan.active}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={() => {}}
                  />
                  <span className="ml-2 text-sm text-gray-600">Active</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Gateway Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Gateway Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stripe Secret Key</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value="sk_test_****************************"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stripe Publishable Key</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value="pk_test_****************************"
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">PayPal Client ID</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value="client_id_****************************"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PayPal Secret</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value="client_secret_****************************"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}