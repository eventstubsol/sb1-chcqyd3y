import React, { useState } from 'react';
import { FormBuilder } from '../../../../components/form-builder/FormBuilder';
import { RegistrationStats } from '../../../../components/registration/RegistrationStats';
import { RegistrationList } from '../../../../components/registration/RegistrationList';

export default function RegistrationTab() {
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  const handleCreateForm = () => {
    setShowFormBuilder(true);
  };

  const handleCloseFormBuilder = () => {
    setShowFormBuilder(false);
  };

  return (
    <div className="space-y-6">
      {!showFormBuilder ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Registration Forms</h2>
            <button
              onClick={handleCreateForm}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create New Form
            </button>
          </div>

          <RegistrationStats />
          <RegistrationList />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <FormBuilder onClose={handleCloseFormBuilder} />
          </div>
        </div>
      )}
    </div>
  );
}