import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { ProductReadDto } from '../../types/product';

const PAGE_SIZE = 5;

const fetchProducts = async (page: number, filters: Record<string, any>) => {
  const params = new URLSearchParams();
  params.append('Page', page.toString());
  params.append('PageSize', PAGE_SIZE.toString());

  if (filters.categoryName) {
    params.append('CategoryName', filters.categoryName);
  }
  if (filters.minPrice) {
    params.append('MinPrice', filters.minPrice);
  }
  if (filters.maxPrice) {
    params.append('MaxPrice', filters.maxPrice);
  }
  if (filters.tagNames && filters.tagNames.length > 0) {
    filters.tagNames.forEach((tag: string) => {
      params.append('TagNames', tag);
    });
  }

  const response = await apiClient(`/api/Product?${params.toString()}`);
  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  
  const products: ProductReadDto[] = await response.json();
  const paginationHeader = response.headers.get('X-Pagination');
  const metaData = paginationHeader ? JSON.parse(paginationHeader) : {};
  
  return { products, metaData };
};

export function useProducts(page: number, filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: ['products', page, filters], 
    queryFn: () => fetchProducts(page, filters),
    staleTime: 1000 * 60 * 5, 
  });
}