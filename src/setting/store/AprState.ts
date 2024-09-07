import { create } from 'zustand'

interface AprState {
  APR: number
  increaseApr: () => void
  decreaseApr: () => void
}

export const useAprState = create<AprState>((set) => ({
  APR: 8,
  increaseApr: () => set((state) => ({ APR: state.APR + 2 })),
  decreaseApr: () => set((state) => ({ APR: state.APR - 2 }))
}))
