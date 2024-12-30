import React from 'react';
import { useFormBuilderStore } from '../../../stores/formBuilderStore';
import { AutoSaveIndicator } from './AutoSaveIndicator';

const AUTOSAVE_DELAY = 2000; // 2 seconds

export function AutoSaveWrapper({ children }: { children: React.ReactNode }) {
  const { isDirty, saveForm } = useFormBuilderStore();

  React.useEffect(() => {
    if (!isDirty) return;

    const timeoutId = setTimeout(() => {
      saveForm();
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [isDirty, saveForm]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <AutoSaveIndicator />
      </div>
      {children}
    </div>
  );
}