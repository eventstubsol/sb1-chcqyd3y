import React from 'react';
import { Users } from 'lucide-react';

interface AttendanceData {
  expectedCount: number;
}

interface AttendanceStepProps {
  data: AttendanceData;
  onChange: (data: Partial<AttendanceData>) => void;
}

export default function AttendanceStep({ data, onChange }: AttendanceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Expected Attendance</h3>
        <p className="mt-1 text-sm text-gray-500">
          Help us prepare by estimating your event's attendance
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <Users className="h-8 w-8 text-indigo-600" />
          <div>
            <h4 className="text-lg font-medium text-gray-900">Attendee Capacity</h4>
            <p className="text-sm text-gray-500">Set the maximum number of attendees</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Number of Attendees
            </label>
            <input
              type="number"
              min="1"
              value={data.expectedCount || ''}
              onChange={(e) => onChange({ expectedCount: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              type="button"
              onClick={() => onChange({ expectedCount: 50 })}
              className="p-4 border rounded-lg text-center hover:border-indigo-500 transition-colors"
            >
              <span className="block text-2xl font-bold text-gray-900">50</span>
              <span className="text-sm text-gray-500">Small Event</span>
            </button>
            <button
              type="button"
              onClick={() => onChange({ expectedCount: 200 })}
              className="p-4 border rounded-lg text-center hover:border-indigo-500 transition-colors"
            >
              <span className="block text-2xl font-bold text-gray-900">200</span>
              <span className="text-sm text-gray-500">Medium Event</span>
            </button>
            <button
              type="button"
              onClick={() => onChange({ expectedCount: 500 })}
              className="p-4 border rounded-lg text-center hover:border-indigo-500 transition-colors"
            >
              <span className="block text-2xl font-bold text-gray-900">500+</span>
              <span className="text-sm text-gray-500">Large Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}