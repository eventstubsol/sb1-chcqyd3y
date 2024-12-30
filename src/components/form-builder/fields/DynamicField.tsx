import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';

interface DynamicFieldProps {
  fieldId: string;
  value: any;
}

export function DynamicField({ fieldId, value }: DynamicFieldProps) {
  const { fields, updateFormData, errors, apiErrors } = useFormBuilderStore();
  const field = fields.find(f => f.id === fieldId);

  if (!field) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData(field.name, e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {(errors[fieldId] || apiErrors[fieldId]) && (
        <p className="text-sm text-red-600">
          {errors[fieldId] || apiErrors[fieldId]}
        </p>
      )}
    </div>
  );
}