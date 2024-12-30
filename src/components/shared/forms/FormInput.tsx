import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
}

export default function FormInput({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  type = 'text',
  placeholder,
  icon: Icon,
  className = ''
}: FormInputProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && !disabled && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required && !disabled}
          placeholder={placeholder}
          className={`
            block w-full rounded-md shadow-sm
            ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            ${disabled 
              ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed' 
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            }
            transition-all duration-200 ease-in-out
          `}
        />
      </div>
    </div>
  );
}