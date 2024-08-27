import { Outlet } from 'react-router-dom'
import Login from '../login/Login'
import { useUser } from '../../setting/store/user'

function PrivateRoutes() {
  const { token } = useUser()
  return <>{token ? <Outlet /> : <Login />}</>
}
export default PrivateRoutes
