import React, { useState } from 'react';
import { Tag, Percent, Calendar, Trash2 } from 'lucide-react';
import { AnimatedCard } from '../../common';

interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'expired' | 'draft';
}

export default function PromotionsTab() {
  const [promotions] = useState<Promotion[]>([
    {
      id: '1',
      code: 'SUMMER2024',
      type: 'percentage',
      value: 20,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      usageLimit: 100,
      usedCount: 45,
      status: 'active'
    },
    {
      id: '2',
      code: 'EARLYBIRD',
      type: 'fixed',
      value: 50,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      usageLimit: 50,
      usedCount: 0,
      status: 'draft'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Create Promotion Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Create Promotion
        </button>
      </div>

      {/* Active Promotions */}
      <AnimatedCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Active Promotions</h3>
          <span className="text-sm text-gray-500">
            {promotions.filter(p => p.status === 'active').length} active
          </span>
        </div>

        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{promo.code}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      promo.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : promo.status === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {promo.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {promo.type === 'percentage' ? `${promo.value}% off` : `$${promo.value} off`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {promo.usedCount} / {promo.usageLimit} used
                  </span>
                </div>
              </div>

              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}