import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormBuilder } from '../form-builder/FormBuilder';

export function CreateFormButton() {
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  return (
    <div>
      {!showFormBuilder ? (
        <button
          onClick={() => setShowFormBuilder(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Form
        </button>
      ) : (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-4xl">
            <FormBuilder onClose={() => setShowFormBuilder(false)} />
          </div>
        </div>
      )}
    </div>
  );
}