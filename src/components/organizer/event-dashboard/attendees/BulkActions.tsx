import React from 'react';
import { Mail, Download, X } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onMessage: () => void;
  onExport: () => void;
  onDeselect: () => void;
}

export default function BulkActions({
  selectedCount,
  onMessage,
  onExport,
  onDeselect
}: BulkActionsProps) {
  return (
    <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">
          {selectedCount} attendee{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onDeselect}
          className="text-indigo-200 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onMessage}
          className="flex items-center px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-400"
        >
          <Mail className="h-5 w-5 mr-2" />
          Message
        </button>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-400"
        >
          <Download className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>
    </div>
  );
}