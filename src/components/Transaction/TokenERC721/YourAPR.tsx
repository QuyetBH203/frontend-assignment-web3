import { useState } from 'react'

function YourAPR() {
  const [apr, setApr] = useState<number | null>(10)
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-xl font-mono'>Your APR: {apr} %</h4>
        </div>
      </div>
    </>
  )
}
export default YourAPR
