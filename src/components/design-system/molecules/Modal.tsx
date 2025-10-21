import React, { useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '../atoms/Button';
import { FaTimes } from 'react-icons/fa';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    className,
    ...props
  }, ref) => {
    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div
          ref={ref}
          className={cn(
            'bg-slate-900 rounded-xl shadow-2xl border border-slate-700',
            'w-full mx-4 max-h-[90vh] overflow-hidden',
            'transform transition-all duration-300',
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            sizeConfig[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              {title && (
                <h2 className="text-xl font-semibold text-white">{title}</h2>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <FaTimes className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
