import React from 'react';
import { RegistrationStats } from './RegistrationStats';
import { RegistrationList } from './RegistrationList';
import { CreateFormButton } from './CreateFormButton';

export function RegistrationDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Registration Forms</h1>
        <CreateFormButton />
      </div>
      <RegistrationStats />
      <RegistrationList />
    </div>
  );
}