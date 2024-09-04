import { BigNumberish } from 'ethers'

interface Deposit {
  amount: BigNumberish
  depositTime: BigInt
  claimedNFT: boolean
}

export default Deposit
