import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
  tags: string[];
}

interface DeleteConfirmationModalProps {
  group: Group;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({ group, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Delete Group</h3>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Are you sure you wish to delete the Attendee Group "{group.name}"? All the data will be lost.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete Group
          </button>
        </div>
      </div>
    </div>
  );
}