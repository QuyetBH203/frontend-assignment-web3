import { useState } from 'react'
function ClaimReward() {
  const [reward, setReward] = useState<number | null>(null)
  const handleReward = () => {
    setReward(100)
  }
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4 pr-11'>
          <h4 className='text-xl font-mono'>Your Reward:</h4>
          {reward && <span className='text-green-500'>{reward}</span>}

          <button onClick={handleReward} className='px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            Claim Reward
          </button>
        </div>
      </div>
    </>
  )
}

export default ClaimReward
