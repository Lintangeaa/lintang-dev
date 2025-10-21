import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  error?: string;
  helperText?: string;
  className?: string;
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({
    label,
    value,
    onChange,
    error,
    helperText,
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
          </label>
        )}
        
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'h-10 w-16 cursor-pointer rounded border border-slate-300 dark:border-slate-700',
              'bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400',
              'transition-colors duration-200',
              error && 'border-red-500 focus:ring-red-400'
            )}
          />
          <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
            {value}
          </span>
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

ColorPicker.displayName = 'ColorPicker';
