import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { UserReadDto } from '../../types/user';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<UserReadDto[]> => {
      const response = await apiClient('/api/User');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
  });
}

export function useChangeRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newRole }: { id: string; newRole: string }) => {
      const response = await apiClient(`/api/User/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ newRole }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          throw new Error(errorData.errors[firstKey][0]);
        }
        throw new Error(errorData?.detail || 'Failed to update user role');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}