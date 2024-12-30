import React from 'react';
import { useFormBuilderStore, Condition } from '../../../stores/formBuilderStore';

interface ConditionalWrapperProps {
  conditions?: Condition[];
  children: React.ReactNode;
}

export function ConditionalWrapper({ conditions, children }: ConditionalWrapperProps) {
  const { formData } = useFormBuilderStore();

  const shouldRender = React.useMemo(() => {
    if (!conditions || conditions.length === 0) return true;

    return conditions.every(condition => {
      const fieldValue = formData[condition.field];
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value;
        case 'notEquals':
          return fieldValue !== condition.value;
        case 'contains':
          return String(fieldValue).includes(String(condition.value));
        case 'greaterThan':
          return Number(fieldValue) > Number(condition.value);
        case 'lessThan':
          return Number(fieldValue) < Number(condition.value);
        default:
          return true;
      }
    });
  }, [conditions, formData]);

  if (!shouldRender) return null;

  return <>{children}</>;
}