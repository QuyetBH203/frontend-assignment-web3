import { useState } from 'react'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'
import { Token as tokenERC721Address } from '../../../contracts/TokenERC721-address.json'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { EthAddress } from '../../../type/EthAddress'
import toast from 'react-hot-toast'
import { UserInformation } from '../../../type/InforUser'
import { ethers } from 'ethers'
import { useDepositNFTState } from '../../../setting/store/DepositNFTState'
import { useStateTransaction } from '../../../setting/store/stateTransaction'

function WithDrawnNFT() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const { address } = useAccount()
  const { increaseTransaction } = useStateTransaction()

  const { decreaseNFT } = useDepositNFTState()
  const { writeContractAsync: withdrawWriteContract } = useWriteContract()

  const { data: result, refetch } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })

  // Convert BigInt and other non-serializable values to JSON-friendly format
  let data: UserInformation | undefined
  if (result) {
    const jsonResult = JSON.stringify(result, (key, value) => (typeof value === 'bigint' ? value.toString() : value))

    console.log(JSON.parse(jsonResult)) // In ra dưới dạng JSON
    data = JSON.parse(jsonResult) as UserInformation
  }

  let arrNft = data?.userNft

  const handleClick = () => {
    if (!data?.userNft.length) {
      toast.error('You do not have any NFT to withdraw')
      return
    }

    setShowInput(true)
  }
  const handleWithDrawn = async (id: string) => {
    console.log(id)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const txResponse = await withdrawWriteContract({
      address: depositContractAddress as EthAddress,
      abi: depositContractAbi,
      functionName: 'setApprovalForAll',
      args: [tokenERC721Address, true]
    })
    setShowInput(false)
    const ans = await provider.waitForTransaction(txResponse)
    if (ans?.status === 1) {
      const tyResponse = await withdrawWriteContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'withdrawNFT',
        args: [Number(id)]
      })
      const receipt = await provider.waitForTransaction(tyResponse)
      if (receipt?.status === 1) {
        toast.success('Withdraw NFT success')
        refetch()
        decreaseNFT()
        increaseTransaction()
      } else {
        toast.error('Withdraw NFT failed')
      }
    }
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>WithDrawn NFT:</h4>

          <button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-[rgb(250,124,21)] text-white rounded hover:bg-[rgb(250,124,130)]'
          >
            WithDrawn NFT
          </button>
        </div>
      </div>
      {arrNft !== undefined && arrNft.length > 0 && showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-mono mb-4'>Select NFT to withdrawn</h4>

            {/* Hiển thị danh sách NFTs */}
            {arrNft.length > 0 && (
              <ul className='grid grid-cols-3 gap-4 border p-2 rounded mb-4 max-h-48 overflow-y-auto'>
                {arrNft.map((nft, index) => (
                  <li key={index} className='mb-2 flex flex-col items-center'>
                    <p className='text-sm mb-1'>NFT ID: {nft.toString()}</p>
                    <img
                      src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg'
                      alt={`NFT ${nft}`}
                      className='w-20 h-20 object-cover hover:opacity-80 cursor-pointer'
                      onClick={() => handleWithDrawn(nft)}
                    />
                  </li>
                ))}
              </ul>
            )}

            <div className='flex justify-end space-x-4'>
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

export default WithDrawnNFT
