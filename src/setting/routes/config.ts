import { RouteObject } from 'react-router-dom'
import PrivateRoutes from '../../components/privateRoutes'
import Profile from '../../components/users/Profile'
import Home from '../../components/home/Home'
import Blog from '../../components/AllTransaction'
import BlogNew from '../../components/AllTransaction/BlogNew'
import BlogRelated from '../../components/AllTransaction/BlogRelates'
import BlogDetail from '../../components/AllTransaction/BlogDetail'
import Login from '../../components/login/Login'
import LayoutDefault from '../../layout/common/index'
import TransactionAll from '../../components/AllTransaction/TransactionAll'

export const routes: RouteObject[] = [
  {
    Component: PrivateRoutes,
    children: [
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: '/',
        Component: LayoutDefault,
        children: [
          {
            index: true,
            Component: Home
          },
          {
            path: 'history',
            Component: Blog,
            children: [
              {
                index: true,
                Component: TransactionAll
              },
              {
                path: 'news',
                Component: BlogNew
              },
              {
                path: 'relate',
                Component: BlogRelated
              },
              {
                path: ':id',
                Component: BlogDetail
              }
            ]
          },

          {
            path: 'login',
            Component: Login
          }
        ]
      }
    ]
  }
]
