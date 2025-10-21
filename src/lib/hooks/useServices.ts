import { useQuery } from '@tanstack/react-query';
import { listServices } from '@/lib/api/serviceClient';

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters: Record<string, string>) => [...serviceKeys.lists(), { filters }] as const,
};

// Hook untuk mengambil data services
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.lists(),
    queryFn: listServices,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook untuk mengambil service berdasarkan ID
export function useService(serviceId: string) {
  return useQuery({
    queryKey: [...serviceKeys.all, 'detail', serviceId],
    queryFn: async () => {
      const services = await listServices();
      return services.find(service => service.id === serviceId);
    },
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 5,
  });
}
