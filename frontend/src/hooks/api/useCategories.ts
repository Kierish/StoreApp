import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { CategoryReadDto } from '../../types/category';

const fetchCategories = async (): Promise<CategoryReadDto[]> => {
  const response = await apiClient('/api/Category');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, 
  });
}