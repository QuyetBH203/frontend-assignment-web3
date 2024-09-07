import { create } from 'zustand'
import { CounterState } from './counterState'

interface DepositNFTState {
  countNFT: number
  increaseNFT: () => void
  decreaseNFT: () => void
}
export const useDepositNFTState = create<DepositNFTState>((set) => ({
  countNFT: 0,
  increaseNFT: () => set((state) => ({ countNFT: state.countNFT + 1 })),
  decreaseNFT: () => set((state) => ({ countNFT: state.countNFT - 1 }))
}))
