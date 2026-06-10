import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { ProductReadDto } from '../../types/product';

const fetchProductById = async (id: string): Promise<ProductReadDto> => {
  const response = await apiClient(`/api/Product/${id}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
};

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // Only fetch if the ID actually exists
  });
}