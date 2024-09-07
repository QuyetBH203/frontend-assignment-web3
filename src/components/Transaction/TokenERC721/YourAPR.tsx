import { useAprState } from '../../../setting/store/AprState'

function YourAPR() {
  const { APR } = useAprState()

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-xl font-mono'>
            Your APR: <span className='text-green-500'>{APR} %</span>
          </h4>
        </div>
      </div>
    </>
  )
}
export default YourAPR
