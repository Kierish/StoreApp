import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { ProductReadDto } from '../../types/product';

const PAGE_SIZE = 5;

const fetchProducts = async (page: number) => {
  const response = await apiClient(`/api/Product?Page=${page}&PageSize=${PAGE_SIZE}`);
  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  
  const products: ProductReadDto[] = await response.json();
  const paginationHeader = response.headers.get('X-Pagination');
  const metaData = paginationHeader ? JSON.parse(paginationHeader) : {};
  
  return { products, metaData };
};

// The Custom Hook
export function useProducts(page: number) {
  return useQuery({
    queryKey: ['products', page], 
    queryFn: () => fetchProducts(page),
    staleTime: 1000 * 60 * 5, 
  });
}