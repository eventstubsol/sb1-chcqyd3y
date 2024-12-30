import React from 'react';
import { FormStep } from '../../../stores/formBuilderStore';

interface StepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === currentStep
                ? 'bg-blue-600 text-white'
                : index < currentStep
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-12 ${
                index < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}