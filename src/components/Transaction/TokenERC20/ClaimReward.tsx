import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { EthAddress } from '../../../type/EthAddress'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { ethers } from 'ethers'
import Deposit from '../../../type/Deposit'
import { toast } from 'react-hot-toast'
import { useRewardStore } from '../../../setting/store/claimReward'

function ClaimReward() {
  const { address } = useAccount()
  const { increaseReward } = useRewardStore()
  const { writeContractAsync: claimRewardWriteContract } = useWriteContract()
  const { data: result, refetch } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  console.log(result as Deposit)

  const handleClick = async () => {
    if (result && address && Number(ethers.formatUnits((result as Deposit).amount, 18)) !== 0) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      const txResponse = await claimRewardWriteContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'claimReward'
      })
      const receipt = await provider.waitForTransaction(txResponse)
      if (receipt?.status === 1) {
        await refetch()
        toast.success(`you received ${ethers.formatUnits((result as Deposit).receiveReward, 18)}`)
        increaseReward()
      }
    } else {
      toast.error('You can not claim reward')
    }
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4  justify-between'>
          <h4 className='text-xl font-mono'>Claim Reward:</h4>

          <button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Claim Reward
          </button>
        </div>
      </div>
    </>
  )
}

export default ClaimReward
