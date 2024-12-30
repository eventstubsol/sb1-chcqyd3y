import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';

export function WizardFormTest() {
  const { 
    addStep, 
    addField, 
    currentStep, 
    setCurrentStep,
    validateStep,
    formData,
    updateFormData,
    errors
  } = useFormBuilderStore();

  React.useEffect(() => {
    // Set up a test wizard form with multiple steps
    addStep({
      title: 'Personal Information',
      fields: ['name', 'email'],
      validation: (data) => {
        return Boolean(data.name && data.email);
      }
    });

    addStep({
      title: 'Address',
      fields: ['street', 'city', 'zipCode'],
      validation: (data) => {
        return Boolean(data.street && data.city && data.zipCode);
      }
    });

    addStep({
      title: 'Review',
      fields: ['terms'],
      validation: (data) => {
        return Boolean(data.terms);
      }
    });

    // Add fields for each step
    addField({
      type: 'text',
      label: 'Full Name',
      name: 'name',
      required: true,
      step: 0,
      validation: [
        { type: 'required', message: 'Name is required' }
      ]
    });

    addField({
      type: 'email',
      label: 'Email Address',
      name: 'email',
      required: true,
      step: 0,
      validation: [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', value: '^[^@]+@[^@]+\\.[^@]+$', message: 'Invalid email format' }
      ]
    });

    addField({
      type: 'text',
      label: 'Street Address',
      name: 'street',
      required: true,
      step: 1,
      validation: [
        { type: 'required', message: 'Street address is required' }
      ]
    });

    addField({
      type: 'text',
      label: 'City',
      name: 'city',
      required: true,
      step: 1,
      validation: [
        { type: 'required', message: 'City is required' }
      ]
    });

    addField({
      type: 'text',
      label: 'ZIP Code',
      name: 'zipCode',
      required: true,
      step: 1,
      validation: [
        { type: 'required', message: 'ZIP code is required' },
        { type: 'pattern', value: '^\\d{5}(-\\d{4})?$', message: 'Invalid ZIP code format' }
      ]
    });

    addField({
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      name: 'terms',
      required: true,
      step: 2,
      validation: [
        { type: 'required', message: 'You must agree to the terms' }
      ]
    });
  }, [addStep, addField]);

  const handleNext = async () => {
    const isValid = await validateStep(currentStep.toString());
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateStep(currentStep.toString());
    if (isValid) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-1/3 text-center ${
                step === currentStep ? 'text-indigo-600 font-bold' : 'text-gray-500'
              }`}
            >
              Step {step + 1}
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-indigo-600 rounded transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </>
        )}

        {currentStep === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                value={formData.street || ''}
                onChange={(e) => updateFormData('street', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => updateFormData('city', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode || ''}
                onChange={(e) => updateFormData('zipCode', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
              )}
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review Your Information</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Address:</strong> {formData.street}</p>
                <p><strong>City:</strong> {formData.city}</p>
                <p><strong>ZIP Code:</strong> {formData.zipCode}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.terms || false}
                  onChange={(e) => updateFormData('terms', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the terms and conditions
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms}</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Previous
            </button>
          )}
          {currentStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}