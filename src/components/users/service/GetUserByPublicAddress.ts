import { api } from '../../../setting/api/api'

async function GetUserByPublicAddress(publicAddress: string) {
  const response = await api.get(`/users?publicAddress=${publicAddress}`)
  console.log(api.defaults.baseURL)

  console.log(response.data)
  return response.data
}

export default GetUserByPublicAddress
