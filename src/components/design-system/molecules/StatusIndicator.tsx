import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-green-400',
    label: 'Online',
    pulse: true
  },
  offline: {
    color: 'bg-gray-400',
    label: 'Offline',
    pulse: false
  },
  busy: {
    color: 'bg-red-400',
    label: 'Busy',
    pulse: true
  },
  away: {
    color: 'bg-yellow-400',
    label: 'Away',
    pulse: true
  }
};

const sizeConfig = {
  sm: {
    dot: 'w-2 h-2',
    text: 'text-xs'
  },
  md: {
    dot: 'w-3 h-3',
    text: 'text-sm'
  },
  lg: {
    dot: 'w-4 h-4',
    text: 'text-base'
  }
};

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({
    status,
    size = 'md',
    showLabel = false,
    className,
    ...props
  }, ref) => {
    const config = statusConfig[status];
    const sizeStyles = sizeConfig[size];

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <div className="relative">
          <div
            className={cn(
              'rounded-full',
              sizeStyles.dot,
              config.color,
              config.pulse && 'animate-pulse'
            )}
          />
          {config.pulse && (
            <div
              className={cn(
                'absolute inset-0 rounded-full animate-ping',
                config.color,
                'opacity-75'
              )}
            />
          )}
        </div>
        
        {showLabel && (
          <span className={cn('text-slate-300', sizeStyles.text)}>
            {config.label}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';
