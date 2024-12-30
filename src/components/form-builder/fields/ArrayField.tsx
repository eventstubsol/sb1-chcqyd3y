import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useFormBuilderStore, FormField } from '../../../stores/formBuilderStore';
import { DynamicField } from './DynamicField';

interface ArrayFieldProps {
  field: FormField;
}

export function ArrayField({ field }: ArrayFieldProps) {
  const { formData, updateFormData } = useFormBuilderStore();
  const values = (formData[field.name] || []) as any[];

  const addItem = () => {
    if (field.arrayConfig?.maxItems && values.length >= field.arrayConfig.maxItems) {
      return;
    }
    updateFormData(field.name, [...values, field.arrayConfig?.itemField.defaultValue || '']);
  };

  const removeItem = (index: number) => {
    if (field.arrayConfig?.minItems && values.length <= field.arrayConfig.minItems) {
      return;
    }
    const newValues = values.filter((_, i) => i !== index);
    updateFormData(field.name, newValues);
  };

  const updateItem = (index: number, value: any) => {
    const newValues = [...values];
    newValues[index] = value;
    updateFormData(field.name, newValues);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1">
              <DynamicField
                field={{
                  ...field.arrayConfig!.itemField,
                  id: `${field.id}_${index}`,
                  name: `${field.name}[${index}]`
                }}
                onChange={(newValue) => updateItem(index, newValue)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </button>
    </div>
  );
}