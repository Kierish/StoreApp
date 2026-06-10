import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { ProductReadDto } from '../../types/product';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any): Promise<ProductReadDto> => {
      const response = await apiClient('/api/Product', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          throw new Error(errorData.errors[firstKey][0]);
        }
        throw new Error(errorData?.detail || 'Failed to create product');
      }
      return response.json(); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}