import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';
import { WizardStep } from './WizardStep';
import { WizardNavigation } from './WizardNavigation';
import { StepIndicator } from './StepIndicator';

export function WizardForm() {
  const { 
    steps, 
    currentStep, 
    setCurrentStep, 
    validateStep,
    formData 
  } = useFormBuilderStore();

  const handleNext = async () => {
    const isValid = await validateStep(steps[currentStep].id);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <StepIndicator 
        steps={steps} 
        currentStep={currentStep} 
      />
      
      <WizardStep 
        step={steps[currentStep]} 
        formData={formData}
      />
      
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}