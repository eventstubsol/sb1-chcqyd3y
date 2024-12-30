import React, { useState } from 'react';
import { QrCode, History, Settings } from 'lucide-react';
import { AnimatedCard } from '../../../common';
import AttendeeQRCode from '../checkin/AttendeeQRCode';
import CheckInScanner from '../checkin/CheckInScanner';
import CheckInHistory from '../checkin/CheckInHistory';

const MOCK_CHECK_IN_HISTORY = [
  {
    id: '1',
    attendeeId: 'att-1',
    attendeeName: 'John Doe',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'success' as const,
    location: 'Main Entrance'
  },
  {
    id: '2',
    attendeeId: 'att-2',
    attendeeName: 'Jane Smith',
    timestamp: '2024-03-15T10:35:00Z',
    status: 'success' as const,
    location: 'VIP Entrance'
  }
];

export default function CheckInTab() {
  const [activeView, setActiveView] = useState<'scanner' | 'history' | 'settings'>('scanner');

  const handleScan = async (data: { attendeeId: string; eventId: string }) => {
    // In a real implementation, this would validate the QR code with the backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const handleError = (error: string) => {
    console.error('Check-in error:', error);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveView('scanner')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeView === 'scanner'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <QrCode className="h-5 w-5 mr-2" />
          Scanner
        </button>
        <button
          onClick={() => setActiveView('history')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeView === 'history'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <History className="h-5 w-5 mr-2" />
          History
        </button>
        <button
          onClick={() => setActiveView('settings')}
          className={`flex items-center px-4 py-2 rounded-md ${
            activeView === 'settings'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </button>
      </div>

      {activeView === 'scanner' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckInScanner onScan={handleScan} onError={handleError} />
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sample QR Code</h3>
            <AttendeeQRCode
              attendeeId="sample-id"
              eventId="event-id"
              attendeeName="John Doe"
            />
          </div>
        </div>
      )}

      {activeView === 'history' && (
        <CheckInHistory records={MOCK_CHECK_IN_HISTORY} onExport={() => {}} />
      )}

      {activeView === 'settings' && (
        <AnimatedCard>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Check-in Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Allow multiple check-ins per attendee
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Send email confirmation after check-in
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Track check-in location
                </span>
              </label>
            </div>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}