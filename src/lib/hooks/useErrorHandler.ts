import { useCallback } from 'react';

export function useErrorHandler() {
  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`${context ? `${context}: ` : ''}`, error);
    
    // You can add more sophisticated error handling here
    // like sending to error tracking service, showing toast notifications, etc.
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  }, []);

  const handleApiError = useCallback((error: unknown, operation: string) => {
    const message = handleError(error, `API Error during ${operation}`);
    
    // Show user-friendly error message
    alert(`Gagal ${operation.toLowerCase()}. ${message}`);
    
    return message;
  }, [handleError]);

  return {
    handleError,
    handleApiError,
  };
}
