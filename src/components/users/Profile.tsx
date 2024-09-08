import { useEffect, useState } from 'react'
import GetPublicAddress from './service/GetPublicAddress'

export default function Profile() {
  const [publicAddress, setPublicAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchPublicAddress = async () => {
      try {
        const data = await GetPublicAddress() // Call the service to get the public address
        setPublicAddress(data.publicAddress)
      } catch (error) {
        console.error('Failed to fetch public address:', error)
        setPublicAddress(null)
      } finally {
        setLoading(false) // Set loading to false once the fetching is done
      }
    }
    fetchPublicAddress()
  }, [])
  return (
    <>
      <div className='flex items-center space-x-2  p-1'>
        <h3 className='text-xl font-mono'>Your public Address:</h3>
        {loading ? (
          <p>Loading...</p> // Show loading indicator while fetching
        ) : publicAddress ? (
          <p className='font-medium border border-gray-300 rounded-lg p-2 bg-[rgb(220,236,255)]'>{publicAddress}</p> // Display the public address once fetched
        ) : (
          <p>Failed to fetch public address.</p> // Display error message if fetching fails
        )}
      </div>
    </>
  )
}
