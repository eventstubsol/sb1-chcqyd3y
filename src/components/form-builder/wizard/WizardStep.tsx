import React from 'react';
import { FormStep } from '../../../stores/formBuilderStore';
import { DynamicField } from '../fields/DynamicField';

interface WizardStepProps {
  step: FormStep;
  formData: Record<string, any>;
}

export function WizardStep({ step, formData }: WizardStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{step.title}</h3>
      <div className="space-y-4">
        {step.fields.map((fieldId) => (
          <DynamicField 
            key={fieldId} 
            fieldId={fieldId} 
            value={formData[fieldId]} 
          />
        ))}
      </div>
    </div>
  );
}