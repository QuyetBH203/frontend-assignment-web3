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
import { toast } from 'react-hot-toast'
import { useDepositNFTState } from '../../../setting/store/DepositNFTState'
import { Button } from '@nextui-org/react'
import { useStateTransaction } from '../../../setting/store/stateTransaction'

function DepositToken() {
  const [amountToken, setAmountToken] = useState<number>(0)
  const [showInput, setShowInput] = useState<boolean>(false)
  const { address } = useAccount()
  const { increaseTransaction } = useStateTransaction()
  const { writeContractAsync: depositWriteContract, isPending: isPendingDeposit } = useWriteContract()
  const { writeContractAsync: approveWriteContract, isPending: isPendingApprove } = useWriteContract()

  //lay so du hien tai cua account
  const { data: balance } = useBalance({
    address: address,
    token: tokenERC20Address as EthAddress
  })
  if (balance?.value !== undefined) {
    console.log(Number(ethers.formatUnits(balance.value, 18)))
  }
  const { increase } = useCounterStore()
  // bien state de theo doi so du khi rut token
  const { count } = useWithDrawnState()

  //theo kiem tra so luong nft khi deposit token
  const { increaseNFT } = useDepositNFTState()
  const handleClick = () => {
    setShowInput(true)
  }

  //doc thong tin user
  const { data: result, refetch } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  // console.log((result as Deposit).amount)
  // console.log(Number(ethers.formatUnits((result as Deposit).amount, 18)))
  const handleDeposit = async () => {
    console.log(typeof amountToken)

    if (address && balance) {
      let ans = ethers.formatUnits(balance.value, 18) // Chuyển đổi số dư về định dạng dễ đọc
      if (Number(ans) < amountToken) {
        toast.error('You do not have enough token to deposit')

        return
      }
      if (amountToken >= 1000000) {
        console.log('Approve')
        const provider = new ethers.BrowserProvider(window.ethereum)

        // approve so luong token muon deposit
        const txResponse = await approveWriteContract({
          address: tokenERC20Address as EthAddress,
          abi: tokenERC20Abi,
          functionName: 'increaseAllowance',
          args: [depositContractAddress, parseEther(amountToken.toString())]
        })
        const receipt = await provider.waitForTransaction(txResponse)
        if (receipt?.status === 1) {
          const tyResponse = await depositWriteContract({
            address: depositContractAddress as EthAddress,
            abi: depositContractAbi,
            functionName: 'deposit',
            args: [parseEther(amountToken.toString())]
          })
          const receipt = await provider.waitForTransaction(tyResponse)
          if (receipt?.status === 1) {
            // cap nhat state de tang so luong nft
            increaseNFT()
            toast.success(`You received 1 NFT`)
            increase()
            await refetch()
            increaseTransaction()
            setShowInput(false)
          }
        }
      } else {
        // approve so luong token muon deposit
        const provider = new ethers.BrowserProvider(window.ethereum)
        const tuResponse = await approveWriteContract({
          address: tokenERC20Address as EthAddress,
          abi: tokenERC20Abi,
          functionName: 'increaseAllowance',
          args: [depositContractAddress, parseEther(amountToken.toString())]
        })
        const ans = await provider.waitForTransaction(tuResponse)
        if (ans?.status === 1) {
          const tzResponse = await depositWriteContract({
            address: depositContractAddress as EthAddress,
            abi: depositContractAbi,
            functionName: 'deposit',
            args: [parseEther(amountToken.toString())]
          })
          const cns = await provider.waitForTransaction(tzResponse)
          setShowInput(false)

          if (cns?.status === 1) {
            toast.success('Deposit token successfully')
            increase()
            await refetch()
            increaseTransaction()
          }
        }
        // deposit token
      }

      // increase()
      // await refetch()
    }
  }

  // khi withdrawn token thi amount token cua user thay doi
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
            Total tokens ERC20 you are staking :{' '}
            {(result as Deposit) && (
              <span className='text-green-500'>{Number(ethers.formatUnits((result as Deposit).amount, 18))}</span>
            )}
          </h4>

          <Button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Deposit Token
          </Button>
        </div>
      </div>
      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter Amount to Deposit</h4>
            <input type='number' onChange={handleInputChange} className='border p-2 rounded w-full mb-4' />
            <div className='flex justify-end space-x-4'>
              <Button
                onClick={handleDeposit}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
                isLoading={isPendingDeposit || isPendingApprove}
              >
                Deposit
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

export default DepositToken
