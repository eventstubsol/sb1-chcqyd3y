import React from 'react';
import { Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { AnimatedCard } from '../../../common';

interface CheckInRecord {
  id: string;
  attendeeId: string;
  attendeeName: string;
  timestamp: string;
  status: 'success' | 'failed';
  location?: string;
  checkedInBy?: string;
}

interface CheckInHistoryProps {
  records: CheckInRecord[];
  onExport?: () => void;
}

export default function CheckInHistory({ records, onExport }: CheckInHistoryProps) {
  return (
    <AnimatedCard>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Check-in History</h3>
        {onExport && (
          <button
            onClick={onExport}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Export History
          </button>
        )}
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                record.status === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {record.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{record.attendeeName}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(record.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            {record.location && (
              <span className="text-sm text-gray-500">{record.location}</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}