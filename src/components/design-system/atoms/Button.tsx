import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
  outline: 'border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10',
  ghost: 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg',
          'transition-all duration-300 transform hover:scale-105 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          // Variants
          buttonVariants[variant],
          // Sizes
          buttonSizes[size],
          // Full width
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
