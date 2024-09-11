import { useEffect } from 'react'
import { useAprState } from '../../../setting/store/AprState'
import { useAccount, useReadContract } from 'wagmi'
import { EthAddress } from '../../../type/EthAddress'
import Deposit from '../../../type/Deposit'
import { Token as depositContractAddress } from '../../../contracts/DepositContract-address.json'
import { abi as depositContractAbi } from '../../../contracts/DepositContract.json'

function YourAPR() {
  const { address } = useAccount()
  const { APR } = useAprState()
  const { data: result, refetch } = useReadContract({
    address: depositContractAddress as EthAddress,
    abi: depositContractAbi,
    functionName: 'getUserInfor',
    args: [address]
  })
  let data
  if (result) {
    // Convert BigInt and other non-serializable values to JSON-friendly format
    const jsonResult = JSON.stringify(result, (key, value) => (typeof value === 'bigint' ? value.toString() : value))

    console.log(JSON.parse(jsonResult)) // In ra dưới dạng JSON
    data = JSON.parse(jsonResult) as Deposit
  }
  console.log(data)

  useEffect(() => {
    refetch()
  }, [APR])

  return (
    <>
      <div className='container mx-auto p-4'>
        <div className='flex items-center space-x-4'>
          <h4 className='text-xl font-mono'>
            Your APR: <span className='text-green-500'>{Number(data?.APR) === 0 ? 8 : Number(data?.APR)} %</span>
          </h4>
        </div>
      </div>
    </>
  )
}
export default YourAPR
