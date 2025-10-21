import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    error,
    helperText,
    fullWidth = true,
    resize = 'vertical',
    id,
    ...props
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={cn(
            // Base styles
            'w-full rounded-md border px-3 py-2 text-sm',
            'bg-white/90 dark:bg-slate-800',
            'border-slate-300 dark:border-slate-700',
            'text-slate-900 dark:text-slate-100',
            'placeholder-slate-500 dark:placeholder-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent',
            'transition-colors duration-200',
            // Resize
            resize === 'none' && 'resize-none',
            resize === 'vertical' && 'resize-y',
            resize === 'horizontal' && 'resize-x',
            resize === 'both' && 'resize',
            // Error state
            error && 'border-red-500 focus:ring-red-400',
            className
          )}
          ref={ref}
          {...props}
        />
        
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

Textarea.displayName = 'Textarea';
