import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

// Shared helper to parse backend errors (including FluentValidation errors)
const parseAuthError = async (response: Response) => {
  const data = await response.json();
  if (data.errors && typeof data.errors === 'object') {
    const firstErrorKey = Object.keys(data.errors)[0];
    return new Error(data.errors[firstErrorKey][0]);
  }
  return new Error(data.detail || "Authentication failed.");
};

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await apiClient("/api/auth/login-user", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw await parseAuthError(response);
      return response.json();
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient("/api/auth/register-user", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw await parseAuthError(response);
      return response.json();
    }
  });
}