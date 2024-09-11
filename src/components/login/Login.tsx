import { Button } from '@nextui-org/react'
import { useConnect, useSignMessage } from 'wagmi'
import Web3 from 'web3'
import GetUserByPublicAddress from '../users/service/GetUserByPublicAddress'
import createUserByPublicAdress from '../users/service/CreateUserByPublicAdress'
import AuthUser from '../users/service/AuthUser'
import { useUser } from '../../setting/store/user'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let web3: Web3 | undefined
function Login() {
  const { connectors } = useConnect()
  const { setToken } = useUser()
  const { signMessageAsync } = useSignMessage()

  const handleSignMessage = async ({ publicAddress, nonce }: { publicAddress: string; nonce: number }) => {
    try {
      console.log(nonce)

      const message = `I am signing my one-time nonce: ${nonce}`

      // Use Wagmi's signMessageAsync method to sign the message
      const signature = await signMessageAsync({ message })

      return { publicAddress, signature }
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.')
    }
  }
  const handleClick = async () => {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })

    if (!web3) {
      try {
        // Request account access if needed

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum)
      } catch (error) {
        toast.error('You need to allow MetaMask.')
        return
      }
    }

    try {
      // Request account access and show the MetaMask interface for selecting an account
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const publicAddress = accounts[0].toLowerCase()
      console.log(publicAddress)

      const data = await GetUserByPublicAddress(publicAddress)
        .then((user) => (user.length ? user[0] : createUserByPublicAdress(publicAddress)))
        .then(handleSignMessage)
        .then(AuthUser)
        .then((response) => {
          toast.success('Login successful!')
          setToken(response.accessToken.token.toString())
        })
        .catch((error) => {
          console.log(error)
          toast.error('You need to sign the message to be able to log in.')
        })
      console.log(data)
    } catch (error) {
      toast.error('You need to sign the message to be able to log in.')
      window.alert('Please activate MetaMask and allow account access.')
      return
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-[rgb(255,251,242)]'>
        <div className='text-center  rounded-lg '>
          <Button onClick={handleClick} className='m-2 w-80 h-16 flex justify-center items-center' color='primary'>
            <img src={connectors[1].icon} alt='MetaMask' className='inline-block mr-2 w-12 h-12' />
            <h3 className='font-bold text-yellow-50'>Sign in with {connectors[1].name}</h3>
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Login
