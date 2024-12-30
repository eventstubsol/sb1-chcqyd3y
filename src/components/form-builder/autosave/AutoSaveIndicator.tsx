import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';
import { Save, Check } from 'lucide-react';

export function AutoSaveIndicator() {
  const { isDirty, lastSaved } = useFormBuilderStore();

  if (!isDirty && !lastSaved) return null;

  return (
    <div className="flex items-center text-sm">
      {isDirty ? (
        <>
          <Save className="h-4 w-4 text-gray-400 animate-pulse mr-1" />
          <span className="text-gray-500">Saving...</span>
        </>
      ) : (
        <>
          <Check className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-gray-500">
            Saved {lastSaved ? new Date(lastSaved).toLocaleTimeString() : ''}
          </span>
        </>
      )}
    </div>
  );
}