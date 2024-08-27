import { api } from '../../../setting/api/api'

async function createUserByPublicAdress(publicAddress: string) {
  const response = await api.post('/users', { publicAddress: publicAddress })
  console.log(response.data)
  console.log(response.data)
  return response.data
}

export default createUserByPublicAdress
