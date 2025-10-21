import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listOrders, createOrder, updateOrder, OrderItem, OrderPayload } from '@/lib/api/ordersClient';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: Record<string, null>) => [...orderKeys.lists(), { filters }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

// Hook untuk mengambil semua orders
export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: listOrders,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook untuk mengambil order berdasarkan ID
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: async () => {
      const orders = await listOrders();
      return orders.find(order => order.id === orderId);
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 2,
  });
}

// Hook untuk membuat order baru
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Invalidate dan refetch orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create order:', error);
    },
  });
}

// Hook untuk update order
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrderPayload> }) =>
      updateOrder(id, data as OrderPayload),
    onSuccess: (updatedOrder) => {
      // Update cache dengan data yang baru
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      
      // Invalidate orders list untuk memastikan data terbaru
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update order:', error);
    },
  });
}

// Hook untuk optimistically update order
export function useOptimisticUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrderPayload> }) =>
      updateOrder(id, data as OrderPayload),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: orderKeys.detail(id) });

      // Snapshot previous value
      const previousOrder = queryClient.getQueryData(orderKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(orderKeys.detail(id), (old: OrderItem | undefined) => {
        if (!old) return old;
        return { ...old, ...data };
      });

      // Return context with previous value
      return { previousOrder };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousOrder) {
        queryClient.setQueryData(orderKeys.detail(variables.id), context.previousOrder);
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
