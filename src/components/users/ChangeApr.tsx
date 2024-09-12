import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { Token as depositContractAddress } from '../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../contracts/DepositContract.json'
import { ethers } from 'ethers'
import { EthAddress } from '../../type/EthAddress'
import { toast } from 'react-hot-toast'
import { useAprChange } from '../../setting/store/changeAprState'

export default function ChangeApr() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [apr, setApr] = useState<number>(0)
  const { address } = useAccount()
  const { increaseAprChange } = useAprChange()

  const { writeContractAsync: changeAprContract, isPending: isPendingChangeApr } = useWriteContract()

  const handleChangeApr = async () => {
    if (address) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const txResponse = await changeAprContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'changeAPR',
        args: [Number(apr)]
      })
      const receipt = await provider.waitForTransaction(txResponse)
      if (receipt?.status === 1) {
        toast.success('Change APR successfully')
        increaseAprChange()
        setShowInput(false)
      }
    }
  }

  const handleClick = () => {
    setShowInput(true)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApr(Number(event.target.value))
  }
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4  justify-between'>
          <h4 className='text-xl font-mono'>Change APR:</h4>

          <Button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-red-600 text-white rounded hover:bg-red-500 font-semibold'
          >
            Change APR
          </Button>
        </div>
      </div>
      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter APR to change</h4>
            <input type='number' onChange={handleInputChange} className='border p-2 rounded w-full mb-4' />
            <div className='flex justify-end space-x-4'>
              <Button
                onClick={handleChangeApr}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
                isLoading={isPendingChangeApr}
              >
                Change APR
              </Button>
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
