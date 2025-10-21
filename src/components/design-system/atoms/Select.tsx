import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    label,
    error,
    helperText,
    options,
    placeholder,
    fullWidth = true,
    id,
    ...props
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <select
          id={selectId}
          className={cn(
            // Base styles
            'w-full rounded-md border px-3 py-2 text-sm',
            'bg-white/90 dark:bg-slate-800',
            'border-slate-300 dark:border-slate-700',
            'text-slate-900 dark:text-slate-100',
            'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent',
            'transition-colors duration-200',
            'appearance-none cursor-pointer',
            // Error state
            error && 'border-red-500 focus:ring-red-400',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
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

Select.displayName = 'Select';
