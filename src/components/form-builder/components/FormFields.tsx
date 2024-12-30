import React from 'react';
import { FieldArray } from 'formik';
import { Type, Mail, Phone, Calendar, List, CheckSquare, Radio } from 'lucide-react';
import { FieldTypeButton } from './FieldTypeButton';

const FIELD_TYPES = [
  { type: 'Text', icon: Type },
  { type: 'Email', icon: Mail },
  { type: 'Phone', icon: Phone },
  { type: 'Date', icon: Calendar },
  { type: 'Select', icon: List },
  { type: 'Checkbox', icon: CheckSquare },
  { type: 'Radio', icon: Radio },
];

export function FormFields() {
  return (
    <FieldArray name="fields">
      {({ push }) => (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Form Fields</h2>
          <p className="text-sm text-gray-500">Add and configure the fields for your form</p>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {FIELD_TYPES.map(({ type, icon }) => (
              <FieldTypeButton
                key={type}
                type={type}
                icon={icon}
                onClick={() => push({ type: type.toLowerCase(), label: '', required: false })}
              />
            ))}
          </div>
        </div>
      )}
    </FieldArray>
  );
}