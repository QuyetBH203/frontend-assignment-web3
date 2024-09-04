import { useEffect, useState } from 'react'
import { Token as tokenERC20Address } from '../../../contracts/TokenERC20-address.json'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { abi as tokenERC20Abi } from '../../../contracts/TokenERC20.json'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { ethers, parseEther } from 'ethers'
import Deposit from '../../../type/Deposit'
import { useCounterStore } from '../../../setting/store/counterState'
import { EthAddress } from '../../../type/EthAddress'
import { useWithDrawnState } from '../../../setting/store/withDrawnState'

type Hash = EthAddress
function DepositToken() {
  const [depositToken, setDepositToken] = useState<number | null>(null)
  const [amountToken, setAmountToken] = useState<number>(0)
  const [showInput, setShowInput] = useState<boolean>(false)
  const { address } = useAccount()
  const { writeContractAsync: depositWriteContract } = useWriteContract()
  const { writeContractAsync: approveWriteContract } = useWriteContract()
  const { data: balance } = useBalance({
    address: address,
    token: tokenERC20Address as EthAddress
  })
  const { increase } = useCounterStore()
  const { count } = useWithDrawnState()
  const handleClick = () => {
    setShowInput(true)
  }

  const { data: result, refetch } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  // console.log((result as Deposit).amount)
  // console.log(Number(ethers.formatUnits((result as Deposit).amount, 18)))
  const handleDeposit = async () => {
    setDepositToken(amountToken)
    if (address && balance) {
      await approveWriteContract({
        address: tokenERC20Address as EthAddress,
        abi: tokenERC20Abi,
        functionName: 'increaseAllowance',
        args: [depositContractAddress, parseEther(amountToken.toString())]
      })
      await depositWriteContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'deposit',
        args: [parseEther(amountToken.toString())]
      })
      increase()
      await refetch()
    }
    setShowInput(false)
  }
  useEffect(() => {
    refetch()
  }, [count])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToken(Number(event.target.value))
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>
            Total tokens ERC20 staked :{' '}
            {(result as Deposit) && (
              <span className='text-green-500'>{Number(ethers.formatUnits((result as Deposit).amount, 18))}</span>
            )}
          </h4>

          <button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Deposit Token
          </button>
        </div>
      </div>
      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter Amount to Mint</h4>
            <input
              type='number'
              value={amountToken}
              onChange={handleInputChange}
              className='border p-2 rounded w-full mb-4'
            />
            <div className='flex justify-end space-x-4'>
              <button onClick={handleDeposit} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>
                Deposit
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

export default DepositToken
