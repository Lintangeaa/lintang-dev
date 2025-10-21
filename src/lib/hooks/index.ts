// API Hooks
export { useServices } from './useServices';
export { useOrders, useOrder, useCreateOrder, useUpdateOrder, useOptimisticUpdateOrder } from './useOrders';

// Utility Hooks
export { useInvoice } from './useInvoice';
export { useErrorHandler } from './useErrorHandler';

// Re-export types
export type { ServiceItem } from '@/lib/api/serviceClient';
export type { OrderItem, OrderPayload } from '@/lib/api/ordersClient';
