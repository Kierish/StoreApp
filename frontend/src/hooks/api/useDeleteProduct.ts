// src/hooks/api/useDeleteProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutation function actually performs the API call
    mutationFn: async (id: string) => {
      const response = await apiClient(`/api/Product/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      return response;
    },
    // On success, we tell TanStack Query to mark the 'products' cache as stale.
    // This forces any component displaying products to auto-refresh its data!
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}