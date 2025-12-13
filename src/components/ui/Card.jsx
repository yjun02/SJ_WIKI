import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className }) {
  return (
    <div className={cn("bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-lg p-6", className)}>
      {children}
    </div>
  );
}
