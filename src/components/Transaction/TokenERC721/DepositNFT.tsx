import { useEffect, useState } from 'react'
import { Token as tokenERC721Address } from '../../../contracts/TokenERC721-address.json'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'
import { abi as tokenERC721Abi } from '../../../contracts/TokenERC721.json'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { EthAddress } from '../../../type/EthAddress'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { useDepositNFTState } from '../../../setting/store/DepositNFTState'
import { useAprState } from '../../../setting/store/AprState'

function DepositNFT() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [NFTID, setNFTID] = useState<number>(0)
  const [nfts, setNFTs] = useState<any[]>([])
  const { address } = useAccount()
  const { countNFT } = useDepositNFTState()
  const { increaseApr } = useAprState()
  const { data: balance, refetch } = useBalance({
    address: address,
    token: tokenERC721Address as EthAddress
  })
  console.log(balance)

  const { data: nftCount, refetch: refetchNFTCount } = useReadContract({
    address: tokenERC721Address as EthAddress,
    abi: tokenERC721Abi,
    functionName: 'balanceOf',
    args: [address]
  })

  const { writeContractAsync: depositWriteContract } = useWriteContract()

  console.log(Number(nftCount))
  console.log(nftCount)
  console.log(countNFT)
  useEffect(() => {
    refetchNFTCount()
  }, [countNFT])
  useEffect(() => {
    const fetchNFTs = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(tokenERC721Address, tokenERC721Abi, provider)

      const nftData = []
      for (let i = 0; i < Number(nftCount); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i)
        const tokenURI = await contract.tokenURI(tokenId)
        nftData.push({ tokenId, tokenURI })
      }

      setNFTs(nftData)
    }

    fetchNFTs()
  }, [nftCount, address])
  console.log(nfts)
  const handleClick = () => {
    if (!nfts.length) {
      toast.error('You do not have any NFTs to deposit')
      return
    }
    setShowInput(true)
  }
  const handleDeposit = async (id: String) => {
    setNFTID(NFTID)
    const provider = new ethers.BrowserProvider(window.ethereum)

    const tyResponse = await depositWriteContract({
      address: tokenERC721Address as EthAddress,
      abi: tokenERC721Abi,
      functionName: 'setApprovalForAll',
      args: [depositContractAddress, true]
    })
    setShowInput(false)
    const ans = await provider.waitForTransaction(tyResponse)
    if (ans?.status === 1) {
      const txResponse = await depositWriteContract({
        address: depositContractAddress as EthAddress,
        abi: depositContractAbi,
        functionName: 'depositNFT',
        args: [Number(id)]
      })

      const receipt = await provider.waitForTransaction(txResponse)
      if (receipt?.status === 1) {
        toast.success(`Deposit NFT ${id} successfully`)
        refetchNFTCount()
        increaseApr()
      }

      console.log(id)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center space-x-4 justify-between'>
        <h4 className='text-xl font-mono'>Deposit NFT:</h4>

        <button
          onClick={handleClick}
          className='flex-shrink-0 w-32 py-2 bg-[rgb(250,124,21)] text-white rounded hover:bg-[rgb(250,124,130)]'
        >
          Deposit NFT
        </button>
      </div>
      {nfts.length > 0 && showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-mono mb-4'>Select NFT to Deposit</h4>

            {/* Hiển thị danh sách NFTs */}
            {nfts.length > 0 && (
              <ul className='grid grid-cols-3 gap-4 border p-2 rounded mb-4 max-h-48 overflow-y-auto'>
                {nfts.map((nft, index) => (
                  <li key={index} className='mb-2 flex flex-col items-center'>
                    <p className='text-sm mb-1'>NFT ID: {nft.tokenId.toString()}</p>
                    <img
                      src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg'
                      alt={`NFT ${nft.tokenId}`}
                      className='w-20 h-20 object-cover hover:opacity-80 cursor-pointer'
                      onClick={() => handleDeposit(nft.tokenId.toString())}
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
    </div>
  )
}

export default DepositNFT
