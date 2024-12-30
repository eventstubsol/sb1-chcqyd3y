import React, { useState } from 'react';
import { X, Upload, Download, AlertTriangle } from 'lucide-react';

interface ImportAttendeesModalProps {
  onClose: () => void;
  onImport: (file: File) => Promise<{ success: boolean; message: string }>;
}

const ImportAttendeesModal: React.FC<ImportAttendeesModalProps> = ({ onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    setError(null);
    
    try {
      const result = await onImport(file);
      if (!result.success) {
        setError(result.message);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Failed to import attendees. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ['name', 'email', 'phone', 'company', 'jobTitle', 'ticketType', 'dietaryRestrictions', 'notes'];
    const csvContent = [
      headers.join(','),
      'John Doe,john@example.com,+1234567890,Acme Inc,Manager,regular,None,VIP guest',
      'Jane Smith,jane@example.com,+0987654321,Tech Corp,Developer,vip,Vegetarian,Speaker'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendees-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Import Attendees</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Template Download */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Download Template</h4>
            <p className="text-sm text-gray-500 mb-4">
              Use our template to ensure your data is formatted correctly.
            </p>
            <button
              onClick={downloadTemplate}
              className="flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Template
            </button>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-1 text-sm text-gray-600">
                Upload your CSV file with attendee details
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              >
                Select File
              </label>
              {file && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions</h4>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Use CSV file format</li>
              <li>Required columns: Name, Email</li>
              <li>Optional columns: Phone, Company, Job Title, Ticket Type, etc.</li>
              <li>Maximum 1000 attendees per import</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Attendees'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportAttendeesModal;