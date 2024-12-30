import React from 'react';
import { type IconProps } from 'lucide-react';

interface FieldTypeButtonProps {
  type: string;
  icon: React.ComponentType<IconProps>;
  onClick: () => void;
}

export function FieldTypeButton({ type, icon: Icon, onClick }: FieldTypeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="block text-sm font-medium text-gray-900">{type}</span>
      </div>
    </button>
  );
}