import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    label,
    error,
    helperText,
    required = false,
    children,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      >
        {label && (
          <label className="block text-sm font-medium text-slate-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {children}
        
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

FormField.displayName = 'FormField';
