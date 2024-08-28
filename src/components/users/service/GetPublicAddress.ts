import { api } from '../../../setting/api/api'

async function GetPublicAddress() {
  const response = await api.get('/users/publicAddress')
  return response.data
}

export default GetPublicAddress
