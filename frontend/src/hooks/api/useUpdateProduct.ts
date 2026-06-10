import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { ProductUpdateDto } from '../../types/product';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductUpdateDto }) => {
      const response = await apiClient(`/api/Product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          throw new Error(errorData.errors[firstKey][0]);
        }
        throw new Error(errorData?.detail || 'Failed to update product');
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}