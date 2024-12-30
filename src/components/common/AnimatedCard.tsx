import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, className = '', onClick }: AnimatedCardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-6
        transform transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-1
        focus-within:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500/20
        animate-scale-in
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}