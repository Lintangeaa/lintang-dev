import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = true,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              // Base styles
              'w-full rounded-md border px-3 py-2 text-sm',
              'bg-white/90 dark:bg-slate-800',
              'border-slate-300 dark:border-slate-700',
              'text-slate-900 dark:text-slate-100',
              'placeholder-slate-500 dark:placeholder-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent',
              'transition-colors duration-200',
              // Padding adjustments for icons
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Error state
              error && 'border-red-500 focus:ring-red-400',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
