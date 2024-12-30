import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';

interface ValidationErrorsProps {
  fieldId: string;
}

export function ValidationErrors({ fieldId }: ValidationErrorsProps) {
  const { errors, apiErrors } = useFormBuilderStore();
  const error = errors[fieldId] || apiErrors[fieldId];

  if (!error) return null;

  return (
    <p className="mt-1 text-sm text-red-600">
      {error}
    </p>
  );
}