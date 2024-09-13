import { useAccount, useReadContract } from 'wagmi'
import { Token as depositContractAddress } from '../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../contracts/DepositContract.json'

type EthAddress = `0x${string}`

type Hash = EthAddress
function InforTokenUser() {
  const { address } = useAccount()
  const result = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  // console.log(result)

  return (
    <>
      <div className='flex gap-x-2.5 p-1 '>
        <div className='flex-1'>
          <h4 className='text-xl font-semibold text-blue-500 '>With Dapp you can exchange NFT and TokenERC20</h4>
        </div>
        {/* <div className='text-xl font-mono '>Your Total Reward: 1000</div> */}
      </div>
    </>
  )
}

export default InforTokenUser
