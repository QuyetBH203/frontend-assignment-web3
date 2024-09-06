import { useEffect, useState } from 'react'
import { Token as tokenERC20Address } from '../../../contracts/TokenERC20-address.json'
import { abi as tokenERC20Abi } from '../../../contracts/TokenERC20.json'
import { useAccount, useBalance, useWriteContract } from 'wagmi'
import { ethers, parseEther } from 'ethers'
import { Button } from '@nextui-org/react'
import { useCounterStore } from '../../../setting/store/counterState'
import { EthAddress } from '../../../type/EthAddress'

type Hash = EthAddress
function Logic() {
  const [amountToken, setAmountToken] = useState<number>(0)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const { count } = useCounterStore()

  const { address } = useAccount()

  const { data: balance, refetch } = useBalance({
    address: address,
    token: tokenERC20Address as EthAddress
  })
  const { writeContractAsync: mintWriteContract, isPending: isPendingMint } = useWriteContract()

  const handleClick = async () => {
    setShowInput(true)
  }

  const handleMint = async () => {
    if (address && balance) {
      setIsMinting(true)
      try {
        const txResponse = await mintWriteContract({
          address: tokenERC20Address as EthAddress,
          abi: tokenERC20Abi,
          functionName: 'mint',
          args: [address, parseEther(amountToken.toString())]
        })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const receipt = await provider.waitForTransaction(txResponse)
        if (receipt?.status === 1) {
          await refetch()
          setShowInput(false)
        }
        console.log(txResponse)
      } catch (err) {
        console.log(err)
      } finally {
        setIsMinting(false)
      }
    }

    // Ẩn input sau khi deposit
  }
  useEffect(() => {
    refetch()
  }, [count])
  // if (count > stateMint) {
  //   await refetch()
  // }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToken(Number(event.target.value))
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>
            Total Amount Token ERC20:{' '}
            {balance?.value !== undefined && (
              <span className='text-green-500'>{Number(ethers.formatUnits(balance.value, 18))}</span>
            )}
          </h4>

          <button
            onClick={handleClick}
            className={`flex-shrink-0 w-32 py-2 text-white rounded ${isMinting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'}`}
            disabled={isMinting} // Disable button khi đang loading
          >
            {isMinting ? 'Loading...' : 'Mint Token'}
          </button>
        </div>
      </div>

      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter Amount to Mint</h4>
            <input type='number' onChange={handleInputChange} className='border p-2 rounded w-full mb-4' />
            <div className='flex justify-end space-x-4'>
              <Button
                onClick={handleMint}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
                isLoading={isPendingMint} // Sử dụng trạng thái loading
              >
                {isPendingMint ? 'Loading...' : 'Mint'}
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

export default Logic
