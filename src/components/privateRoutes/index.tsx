import { Outlet } from 'react-router-dom'
import Login from '../login/Login'
import { useUser } from '../../setting/store/user'

function PrivateRoutes() {
  const { token } = useUser()
  const isTokenValid = (token: string | null) => {
    if (!token) {
      return false
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp * 1000 // `exp` trong JWT thường là thời gian Unix tính bằng giây, cần nhân 1000 để chuyển thành milliseconds
      return Date.now() < exp
    } catch (e) {
      return false
    }
  }
  return <>{isTokenValid(token) ? <Outlet /> : <Login />}</>
}
export default PrivateRoutes
