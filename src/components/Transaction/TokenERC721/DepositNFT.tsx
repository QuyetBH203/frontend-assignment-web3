import { useState } from 'react'

function DepositNFT() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [NFTID, setNFTID] = useState<number>(0)
  const handleClick = () => {
    setShowInput(true)
  }
  const handleDeposit = () => {
    setNFTID(NFTID)
    setShowInput(false)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNFTID(Number(event.target.value))
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center space-x-4 justify-between'>
        <h4 className='text-xl font-mono'>Deposit NFT:</h4>

        <button
          onClick={handleClick}
          className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          Deposit NFT
        </button>
      </div>
      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter NFT ID to Deposit</h4>
            <input
              type='number'
              value={NFTID}
              onChange={handleInputChange}
              placeholder='Enter NFT ID'
              className='border p-2 rounded w-full mb-4'
            />
            <div className='flex justify-end space-x-4'>
              <button onClick={handleDeposit} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>
                Mint
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
    </div>
  )
}

export default DepositNFT
