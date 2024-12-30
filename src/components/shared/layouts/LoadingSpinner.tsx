import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

export default function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-indigo-600',
    white: 'border-white'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-b-transparent ${colorClasses[color]}`} />
  );
}