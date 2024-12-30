import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface AttendeeQRCodeProps {
  attendeeId: string;
  eventId: string;
  attendeeName: string;
}

export default function AttendeeQRCode({ attendeeId, eventId, attendeeName }: AttendeeQRCodeProps) {
  const qrData = JSON.stringify({
    attendeeId,
    eventId,
    timestamp: Date.now()
  });

  const handleDownload = () => {
    const svg = document.getElementById('attendee-qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.download = `${attendeeName}-qr-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <QRCodeSVG
        id="attendee-qr-code"
        value={qrData}
        size={200}
        level="H"
        includeMargin
      />
      <p className="mt-4 text-sm text-gray-600">{attendeeName}</p>
      <button
        onClick={handleDownload}
        className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        <Download className="h-4 w-4 mr-2" />
        Download QR Code
      </button>
    </div>
  );
}