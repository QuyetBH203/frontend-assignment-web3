import { useState } from 'react'

function InforTokenUser() {
  const [amountERC20, setAmountERC20] = useState<number | null>(10)

  return (
    <>
      <div className='flex gap-x-2.5 p-1  border-gray-300 rounded-lg bg-[rgb(220,236,255)]'>
        <div className='flex-1'>
          <h4 className='text-xl font-mono '>Your Total ERC20 Token: {amountERC20}</h4>
        </div>
        <div className='text-xl font-mono '>Your Total Reward: 1000</div>
      </div>
    </>
  )
}

export default InforTokenUser
