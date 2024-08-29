import { useState } from 'react'

function WithDrawnNFT() {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [NFTId, setNFTID] = useState<number>(0)
  const handleClick = () => {
    setShowInput(true)
  }
  const handleWithDrawn = () => {
    setShowInput(false)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNFTID(Number(event.target.value))
  }
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>WithDrawn NFT:</h4>

          <button
            onClick={handleClick}
            className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            WithDrawn NFT
          </button>
        </div>
      </div>
      {showInput && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h4 className='text-lg font-semibold mb-4'>Enter NFT ID to WithDrawn</h4>
            <input
              type='number'
              value={NFTId}
              onChange={handleInputChange}
              className='border p-2 rounded w-full mb-4'
              placeholder='Enter NFT ID'
            />
            <div className='flex justify-end space-x-4'>
              <button
                onClick={handleWithDrawn}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
              >
                With Drawn NFT
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

export default WithDrawnNFT
