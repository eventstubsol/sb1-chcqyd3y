import React from 'react';
import { Switch } from '@headlessui/react';

interface PropertiesPanelProps {
  selectedField: any;
  onUpdateField: (id: string, updates: any) => void;
}

export function PropertiesPanel({ selectedField, onUpdateField }: PropertiesPanelProps) {
  if (!selectedField) {
    return (
      <div className="p-4 text-gray-500">
        Select a field to edit its properties
      </div>
    );
  }

  const handleChange = (property: string, value: any) => {
    onUpdateField(selectedField.id, {
      ...selectedField,
      [property]: value
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          value={selectedField.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Help Text
        </label>
        <input
          type="text"
          value={selectedField.helpText || ''}
          onChange={(e) => handleChange('helpText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Placeholder Text
        </label>
        <input
          type="text"
          value={selectedField.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Required</span>
        <Switch
          checked={selectedField.required || false}
          onChange={(checked) => handleChange('required', checked)}
          className={`${
            selectedField.required ? 'bg-indigo-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              selectedField.required ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
}