import { RouteObject } from 'react-router-dom'
import PrivateRoutes from '../../components/privateRoutes'
import Profile from '../../components/users/Profile'
import Home from '../../components/home/Home'
import Blog from '../../components/blog'
import BlogAll from '../../components/blog/BlogAll'
import BlogNew from '../../components/blog/BlogNew'
import BlogRelated from '../../components/blog/BlogRelates'
import BlogDetail from '../../components/blog/BlogDetail'
import Contact from '../../components/contact'
import Login from '../../components/login/Login'
import LayoutDefault from '../../layout/common/index'

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
            path: 'blog',
            Component: Blog,
            children: [
              {
                index: true,
                Component: BlogAll
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
            path: 'contact',
            Component: Contact
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
