import React from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export default function FormSelect({
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'Select an option',
  icon: Icon,
  disabled = false
}: FormSelectProps) {
  return (
    <div className="animate-fade-in">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`
            appearance-none block w-full rounded-lg border border-gray-300 
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
            pr-10 py-2.5 text-sm
            transition-all duration-200 ease-in-out
            hover:border-indigo-300
            bg-white hover:bg-gray-50/50
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : 'pl-4'}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}