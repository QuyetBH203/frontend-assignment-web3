import { create } from 'zustand'

export interface RewardState {
  countReward: number
  increaseReward: () => void
  decreaseReward: () => void
}

export const useRewardStore = create<RewardState>((set) => ({
  countReward: 0,
  increaseReward: () => set((state) => ({ countReward: state.countReward + 1 })),
  decreaseReward: () => set((state) => ({ countReward: state.countReward - 1 }))
}))
