import { BigNumberish } from 'ethers'

interface Deposit {
  amount: BigNumberish
  depositTime: BigInt
  reward: BigNumberish
  receiveReward: BigNumberish
  APR: BigNumberish
  claimedNFT: boolean
  userNft: BigNumberish[]
}

export default Deposit
