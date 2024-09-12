import { useEffect, useState } from 'react'
import ClaimReward from '../Transaction/TokenERC20/ClaimReward'
import DepositToken from '../Transaction/TokenERC20/DepositToken'
import Logic from '../Transaction/TokenERC20/MintToken'
import WithDrawnToken from '../Transaction/TokenERC20/WithDrawnToken'
import AmountNFT from '../Transaction/TokenERC721/AmountNFT'
import DepositNFT from '../Transaction/TokenERC721/DepositNFT'
import WithDrawnNFT from '../Transaction/TokenERC721/WithDrawnNFT'
import YourAPR from '../Transaction/TokenERC721/YourAPR'
import ChangeApr from '../users/ChangeApr'
import InforTokenUser from '../users/InforTokenUser'
import Profile from '../users/Profile'
import GetPublicAddress from '../users/service/GetPublicAddress'
function Home() {
  const admin = import.meta.env.VITE_ADMIN

  const [publicAddress, setPublicAddress] = useState<string | null>(null)
  useEffect(() => {
    const fetchPublicAddress = async () => {
      try {
        const data = await GetPublicAddress() // Call the service to get the public address
        setPublicAddress(data.publicAddress)
      } catch (error) {
        console.error('Failed to fetch public address:', error)
        setPublicAddress(null)
      }
    }
    fetchPublicAddress()
  }, [])

  return (
    <>
      <div className='flex justify-center my-4'>
        <Profile />
      </div>
      <div className='flex justify-center my-4'>
        <InforTokenUser />
      </div>

      <div className='flex gap-x-2.5'>
        <div className='flex-1 bg-[rgb(255,251,242)]'>
          <Logic />
          <DepositToken />
          <WithDrawnToken />
          <ClaimReward />
          {admin && publicAddress && admin === publicAddress && <ChangeApr />}
        </div>
        <div className='flex-1 bg-[rgb(255,251,242)]'>
          <YourAPR />
          <AmountNFT />
          <DepositNFT />
          <WithDrawnNFT />
        </div>
      </div>
    </>
  )
}
export default Home
