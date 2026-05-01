import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const DEMO_USER: User = {
  id: "demo-user-1",
  email: "demo@luxe.com",
  firstName: "Demo",
  lastName: "User",
};

const DEMO_CREDENTIALS = {
  email: "demo@luxe.com",
  password: "demo123",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        await new Promise((resolve) => setTimeout(resolve, 800));

        if (
          email === DEMO_CREDENTIALS.email &&
          password === DEMO_CREDENTIALS.password
        ) {
          set({
            user: DEMO_USER,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        const storedUsers = localStorage.getItem("luxe-users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const user = users.find(
            (u: User & { password: string }) =>
              u.email === email && u.password === password
          );
          if (user) {
            const { password: _, ...userData } = user;
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
        }

        set({ isLoading: false });
        return false;
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });

        await new Promise((resolve) => setTimeout(resolve, 800));

        const storedUsers = localStorage.getItem("luxe-users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const existingUser = users.find(
          (u: User) => u.email === data.email
        );
        if (existingUser || data.email === DEMO_CREDENTIALS.email) {
          set({ isLoading: false });
          return false;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        };

        users.push(newUser);
        localStorage.setItem("luxe-users", JSON.stringify(users));

        const { password: _, ...userData } = newUser;
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data },
          });
        }
      },
    }),
    {
      name: "luxe-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
