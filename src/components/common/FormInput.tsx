import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'password';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  icon?: LucideIcon;
  hideLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  icon: Icon,
  hideLabel = false,
  disabled = false,
  className = ''
}: FormInputProps) {
  return (
    <div className={`animate-fade-in ${className}`}>
      {!hideLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && !disabled && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Icon 
              className={`h-5 w-5 ${disabled ? 'text-gray-300' : 'text-gray-400'}`}
              aria-hidden="true" 
            />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required && !disabled}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full rounded-lg shadow-sm
            ${disabled 
              ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed' 
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
            transition-all duration-200 ease-in-out
            ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-2.5
            ${hideLabel ? 'mt-0' : 'mt-0.5'}
          `}
          aria-label={hideLabel ? label : undefined}
          readOnly={disabled}
        />
      </div>
    </div>
  );
}