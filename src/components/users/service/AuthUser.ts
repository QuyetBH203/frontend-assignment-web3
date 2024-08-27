import { api } from '../../../setting/api/api'

export interface AuthUser {
  publicAddress: string
  signature: string
}

async function AuthUser({ publicAddress, signature }: { publicAddress: string; signature: string }) {
  const response = await api.post('/users/auth', { publicAddress, signature })
  //   console.log(response.data)
  return response.data
}

export default AuthUser
