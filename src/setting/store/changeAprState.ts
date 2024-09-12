import { create } from 'zustand'

interface AprState {
  APRChange: number
  increaseAprChange: () => void
  decreaseAprChange: () => void
}

export const useAprChange = create<AprState>((set) => ({
  APRChange: 8,
  increaseAprChange: () => set((state) => ({ APRChange: state.APRChange + 2 })),
  decreaseAprChange: () => set((state) => ({ APRChange: state.APRChange - 2 }))
}))
