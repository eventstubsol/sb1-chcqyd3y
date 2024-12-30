import React from 'react';
import { Activity, Calendar, Clock } from 'lucide-react';

interface ActivityData {
  lastLogin?: string;
  loginCount?: number;
  lastActivity?: string;
  activityHistory?: {
    date: string;
    action: string;
    details: string;
  }[];
}

interface ActivityTabProps {
  data: ActivityData;
  onChange: (data: ActivityData) => void;
}

export default function ActivityTab({ data, onChange }: ActivityTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Activity & Usage</h3>
        <p className="text-sm text-gray-500 mb-4">
          View and manage user activity information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Last Login</h4>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {data.lastLogin ? new Date(data.lastLogin).toLocaleDateString() : 'Never'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Login Count</h4>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{data.loginCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Last Activity</h4>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {data.lastActivity ? new Date(data.lastActivity).toLocaleDateString() : 'Never'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Activity History</h4>
          <div className="space-y-4">
            {(data.activityHistory || []).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}