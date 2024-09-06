import { useAprState } from '../../../setting/store/AprState'

function YourAPR() {
  const { count } = useAprState()
  // const { APR } = result as Deposit
  //
  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-xl font-mono'>
            Your APR: <span className='text-green-500'>{count} %</span>
          </h4>
        </div>
      </div>
    </>
  )
}
export default YourAPR
