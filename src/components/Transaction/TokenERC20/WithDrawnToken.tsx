import { useState } from 'react'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { EthAddress } from '../../../type/EthAddress'
import Deposit from '../../../type/Deposit'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useWithDrawnState } from '../../../setting/store/withDrawnState'
import { useCounterStore } from '../../../setting/store/counterState'

function WithDrawnToken() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const { address } = useAccount()

  const { writeContractAsync: withDrawnWriteContract } = useWriteContract()
  const { increase } = useWithDrawnState()
  const { decrease } = useCounterStore()

  const { data: result } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  console.log(result as Deposit)
  // let ans = Number((result as Deposit).depositTime)
  // console.log(ans)
  // console.log(Number(ethers.formatUnits((result as Deposit).amount, 18)))

  const handleClick = () => {
    let currentTime = Math.floor(Date.now() / 1000)
    if (
      result &&
      currentTime - Number((result as Deposit).depositTime) >= 300 &&
      Number(ethers.formatUnits((result as Deposit).amount, 18)) !== 0
    ) {
      setShowInput(true)
    } else {
      toast.error('You must wait 5 minutes to withdraw or your balance is 0')
    }
  }

  const handleWithdrawn = async () => {
    if (result && address) {
      await withDrawnWriteContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'withdrawn'
      })
      increase()
      decrease()
    }
    setShowInput(false) // Ẩn input sau khi deposit
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>WithDrawn Token ERC20:</h4>

          <button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 font-normal bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            WithDrawn
          </button>
        </div>
      </div>

      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-normal mb-4'>amount to be withdrawn</h4>
            <input
              // type='number'
              value={Number(ethers.formatUnits((result as Deposit).amount, 18))}
              readOnly
              className='border p-2 rounded w-full mb-4'
            />
            <div className='flex justify-end space-x-4'>
              <button
                onClick={handleWithdrawn}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 font-normal'
              >
                WithDrawn
              </button>
              <button
                onClick={() => setShowInput(false)}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WithDrawnToken
