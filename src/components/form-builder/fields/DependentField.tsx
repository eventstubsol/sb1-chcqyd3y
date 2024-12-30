import React from 'react';
import { useFormBuilderStore, FormField } from '../../../stores/formBuilderStore';
import { DynamicField } from './DynamicField';

interface DependentFieldProps {
  field: FormField;
}

export function DependentField({ field }: DependentFieldProps) {
  const { formData, updateFormData } = useFormBuilderStore();

  const dependentValues = field.dependsOn?.map(fieldName => formData[fieldName]);
  const shouldRender = React.useMemo(() => {
    if (!field.dependsOn) return true;
    return field.dependsOn.every(fieldName => formData[fieldName] !== undefined);
  }, [field.dependsOn, formData]);

  if (!shouldRender) return null;

  return (
    <DynamicField
      field={field}
      onChange={(value) => updateFormData(field.name, value)}
    />
  );
}