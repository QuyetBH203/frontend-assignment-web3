import { RouteObject, useRoutes } from 'react-router-dom'
import { routes } from '../../setting/routes/config'

function AllRoutes() {
  const elements = useRoutes(routes as RouteObject[])
  return elements
}
export default AllRoutes
