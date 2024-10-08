import { createBrowserRouter, Navigate } from 'react-router-dom'
import CheckAccess, { access } from './common/access'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Navigate to="/" />,
    children: [
      {
        index: true,
        element: <Navigate to="/game" />,
      },
      {
        path: 'game',
        element: (
          <CheckAccess
            access={access.F_PROTECTED}
            fallback={<Navigate to="/auth" />}
          >
            <Home />
          </CheckAccess>
        ),
      },
      {
        path: 'auth',
        element: (
          <CheckAccess
            access={access.F_UNAUTHORIZED}
            fallback={<Navigate to="/game" />}
          >
            <AuthLayout />
          </CheckAccess>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="login" />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
    ],
  },
])

export default router
