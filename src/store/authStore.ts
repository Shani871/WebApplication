import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // In a real app, this would make an API call
        // For demo purposes, we'll simulate a successful login
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
          },
          isAuthenticated: true,
        });
      },
      signup: async (email: string, password: string, name: string) => {
        // In a real app, this would make an API call
        // For demo purposes, we'll simulate a successful signup
        set({
          user: {
            id: '1',
            email,
            name,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);