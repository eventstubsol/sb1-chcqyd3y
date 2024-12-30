import React from 'react';

interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'avatar';
  lines?: number;
  className?: string;
}

export default function SkeletonLoader({ type = 'text', lines = 1, className = '' }: SkeletonLoaderProps) {
  if (type === 'avatar') {
    return (
      <div className={`rounded-full bg-gray-200 animate-pulse ${className}`} style={{ width: '40px', height: '40px' }} />
    );
  }

  if (type === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}