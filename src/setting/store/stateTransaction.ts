import { create } from 'zustand'

export interface CounterTransaction {
  countTs: number
  increaseTransaction: () => void
  decreaseTransaction: () => void
}

export const useStateTransaction = create<CounterTransaction>((set) => ({
  countTs: 0,
  increaseTransaction: () => set((state) => ({ countTs: state.countTs + 1 })),
  decreaseTransaction: () => set((state) => ({ countTs: state.countTs - 1 }))
}))
