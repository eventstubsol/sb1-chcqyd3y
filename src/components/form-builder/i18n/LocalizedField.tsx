import React from 'react';
import { useFormBuilderStore, FormField } from '../../../stores/formBuilderStore';

interface LocalizedFieldProps {
  field: FormField;
  type: 'label' | 'placeholder' | 'error';
  errorType?: string;
}

export function LocalizedField({ field, type, errorType }: LocalizedFieldProps) {
  const { language } = useFormBuilderStore();

  const getLocalizedText = () => {
    switch (type) {
      case 'label':
        return field.i18n?.label?.[language] || field.label;
      case 'placeholder':
        return field.i18n?.placeholder?.[language] || field.placeholder;
      case 'error':
        return errorType ? field.i18n?.errorMessages?.[errorType]?.[language] : '';
      default:
        return '';
    }
  };

  return <>{getLocalizedText()}</>;
}