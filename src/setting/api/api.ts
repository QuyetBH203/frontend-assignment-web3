import axios, { AxiosHeaders } from 'axios'
import { useUser } from '../store/user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const { token } = useUser.getState() ?? { token: null }
  if (token) (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
  return config
})
