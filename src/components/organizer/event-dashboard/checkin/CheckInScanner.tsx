import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { AnimatedCard } from '../../../common';

interface CheckInScannerProps {
  onScan: (data: { attendeeId: string; eventId: string }) => Promise<boolean>;
  onError: (error: string) => void;
}

export default function CheckInScanner({ onScan, onError }: CheckInScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState<{
    success: boolean;
    message: string;
    timestamp: number;
  } | null>(null);

  const startScanning = async () => {
    try {
      setScanning(true);
      // In a real implementation, we would use the device camera here
      // For demo purposes, we'll simulate a successful scan after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScanData = {
        attendeeId: 'mock-attendee-id',
        eventId: 'mock-event-id'
      };
      
      const success = await onScan(mockScanData);
      setLastScan({
        success,
        message: success ? 'Check-in successful!' : 'Invalid QR code',
        timestamp: Date.now()
      });
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to scan QR code');
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    if (lastScan) {
      const timer = setTimeout(() => setLastScan(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastScan]);

  return (
    <AnimatedCard className="max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
          {scanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>

        {lastScan && (
          <div className={`flex items-center mb-4 ${
            lastScan.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {lastScan.success ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            <span>{lastScan.message}</span>
          </div>
        )}

        <button
          onClick={startScanning}
          disabled={scanning}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Start Scanning'}
        </button>
      </div>
    </AnimatedCard>
  );
}