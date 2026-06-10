import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { TagReadDto } from '../../types/tag';

const fetchTags = async (): Promise<TagReadDto[]> => {
  const response = await apiClient('/api/Tag');
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return response.json();
};

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 30, 
  });
}