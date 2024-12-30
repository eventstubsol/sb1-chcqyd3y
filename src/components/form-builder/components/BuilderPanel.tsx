import React from 'react';

export function BuilderPanel() {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Form Preview</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Save Form
        </button>
      </div>
      <div className="min-h-[500px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-sm">Drag and drop fields here to build your form</p>
        </div>
      </div>
    </div>
  );
}

export default BuilderPanel;