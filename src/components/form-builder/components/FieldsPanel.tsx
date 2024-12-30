import React from 'react';
import { PlusCircle, Type, Mail, Phone, Calendar, CheckSquare, List } from 'lucide-react';

const fieldTypes = [
  { id: 'text', icon: Type, label: 'Text Field' },
  { id: 'email', icon: Mail, label: 'Email Field' },
  { id: 'phone', icon: Phone, label: 'Phone Field' },
  { id: 'date', icon: Calendar, label: 'Date Field' },
  { id: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
  { id: 'select', icon: List, label: 'Dropdown' },
];

export function FieldsPanel() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Form Fields</h2>
      <div className="space-y-2">
        {fieldTypes.map((field) => (
          <div
            key={field.id}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 cursor-move"
          >
            <field.icon className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-sm text-gray-700">{field.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldsPanel;