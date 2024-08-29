import { useState } from 'react'

function DepositToken() {
  const [depositToken, setDepositToken] = useState<number | null>(null)
  const [amountToken, setAmountToken] = useState<number>(0)
  const [showInput, setShowInput] = useState<boolean>(false)
  const handleClick = () => {
    setShowInput(true)
  }
  const handleDeposit = () => {
    setDepositToken(amountToken)
    setShowInput(false)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToken(Number(event.target.value))
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 justify-between'>
          <h4 className='text-xl font-mono'>
            Deposit Token ERC20: {depositToken && <span className='text-green-500'>{depositToken}</span>}
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
