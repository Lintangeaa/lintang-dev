import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeConfig = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const variantConfig = {
  default: 'bg-slate-700',
  success: 'bg-emerald-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  gradient: 'bg-gradient-to-r from-emerald-400 to-blue-500'
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    label,
    className,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>{label || 'Progress'}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        
        <div
          className={cn(
            'w-full rounded-full overflow-hidden',
            sizeConfig[size],
            'bg-slate-700'
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variantConfig[variant],
              variant === 'gradient' && 'animate-pulse'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
