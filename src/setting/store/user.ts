import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the User type and UserState interface
interface User {
  // Define properties of the user, e.g.:
  id: string
  publicAddress: string
  // Add other user properties as needed
}

interface UserState {
  auth: boolean
  user: User | null
  token: string | null
  setAuth: (auth: boolean) => void
  setUser: (user: Partial<User>) => void
  setToken: (token: string | null) => void
  clear: () => void
}

// Default user state
const defaultUserState: Omit<UserState, 'setAuth' | 'setUser' | 'setToken' | 'clear'> = {
  auth: false,
  user: null,
  token: null
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      ...defaultUserState,
      setAuth: (auth: boolean) => set({ auth }),
      setUser: (user: Partial<User>) => set({ user: { ...get().user, ...(user as User) } }),
      setToken: (token: string | null) => set({ token }),
      clear: () => set({ ...defaultUserState })
    }),
    {
      name: 'user', // Name of the item in local storage
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => ['auth', 'token'].includes(key)))
    }
  )
)
