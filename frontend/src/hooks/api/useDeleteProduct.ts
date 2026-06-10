import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient(`/api/Product/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}