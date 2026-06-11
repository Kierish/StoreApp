import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';
import type { CommentReadDto, CommentCreateDto } from '../../types/comment';

export function useComments(productId: string | undefined) {
  return useQuery({
    queryKey: ['comments', productId],
    queryFn: async (): Promise<CommentReadDto[]> => {
      const response = await apiClient(`/api/Comment/product/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return response.json();
    },
    enabled: !!productId, 
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CommentCreateDto): Promise<CommentReadDto> => {
      const response = await apiClient('/api/Comment', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Failed to add comment');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string; productId: string }) => {
      const response = await apiClient(`/api/Comment/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Failed to delete comment');
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
    },
  });
}