import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const badgeVariants = {
  default: 'bg-slate-800 text-slate-200 border-slate-700',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  outline: 'bg-transparent text-slate-300 border-slate-600'
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    children,
    ...props
  }, ref) => {
    return (
      <span
        className={cn(
          // Base styles
          'inline-flex items-center font-medium rounded-full border',
          'transition-colors duration-200',
          // Variants
          badgeVariants[variant],
          // Sizes
          badgeSizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
