import React from 'react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious
}: WizardNavigationProps) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`px-4 py-2 rounded ${
          currentStep === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Previous
      </button>
      
      <button
        onClick={onNext}
        className={`px-4 py-2 rounded ${
          currentStep === totalSteps - 1
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}