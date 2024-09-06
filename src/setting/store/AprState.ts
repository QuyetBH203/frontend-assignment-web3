import { create } from 'zustand'
import { CounterState } from './counterState'

export const useAprState = create<CounterState>((set) => ({
  count: 8,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 }))
}))
