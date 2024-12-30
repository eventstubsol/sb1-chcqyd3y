import React from 'react';
import { Copy, Edit, Trash } from 'lucide-react';

interface BuilderCanvasProps {
  fields: any[];
  selectedField: any;
  onSelectField: (field: any) => void;
  onDuplicateField: (id: string) => void;
  onDeleteField: (id: string) => void;
}

export function BuilderCanvas({
  fields,
  selectedField,
  onSelectField,
  onDuplicateField,
  onDeleteField
}: BuilderCanvasProps) {
  const renderField = (field: any) => {
    const isSelected = selectedField?.id === field.id;

    return (
      <div
        key={field.id}
        className={`p-4 mb-4 rounded-lg border ${
          isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
        }`}
        onClick={() => onSelectField(field)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-900">
              {field.label || `Untitled ${field.type} field`}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.helpText && (
              <span className="text-sm text-gray-500 mt-1">{field.helpText}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectField(field);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateField(field.id);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteField(field.id);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>

        <input
          type={field.type === 'email' ? 'email' : 'text'}
          placeholder={field.placeholder || ''}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled
        />
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 min-h-[600px]">
      {fields.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Add form fields from the toolbox
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map(renderField)}
        </div>
      )}
    </div>
  );
}