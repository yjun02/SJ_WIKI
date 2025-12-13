import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'primary', className }) {
  const variants = {
    primary: "bg-primary-500/10 text-primary-400 border-primary-500/20",
    mint: "bg-mint/10 text-mint border-mint/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
}
