import { useState } from 'react'
function ClaimReward() {
  const [reward, setReward] = useState<number | null>(null)
  const handleReward = () => {
    setReward(100)
  }
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4  justify-between'>
          <h4 className='text-xl font-mono'>
            Your Reward: {reward && <span className='text-green-500'>{reward}</span>}
          </h4>

          <button
            onClick={handleReward}
            className='flex-shrink-0 w-32 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Claim Reward
          </button>
        </div>
      </div>
    </>
  )
}

export default ClaimReward
