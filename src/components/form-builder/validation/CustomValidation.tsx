import React from 'react';
import { useFormBuilderStore, ValidationRule } from '../../../stores/formBuilderStore';

interface CustomValidationProps {
  fieldId: string;
  rule: ValidationRule;
}

export function CustomValidation({ fieldId, rule }: CustomValidationProps) {
  const { formData, setFieldError } = useFormBuilderStore();

  React.useEffect(() => {
    const validate = async () => {
      if (rule.validator) {
        const isValid = await rule.validator(formData[fieldId], formData);
        if (!isValid) {
          setFieldError(fieldId, rule.message || 'Validation failed');
        } else {
          setFieldError(fieldId, null);
        }
      }
    };

    validate();
  }, [fieldId, formData, rule, setFieldError]);

  return null;
}