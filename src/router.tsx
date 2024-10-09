import { createBrowserRouter, Navigate } from 'react-router-dom'
import CheckAccess, { access } from './common/access'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Game from './pages/Game'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: 'auth',
    element: (
      <CheckAccess
        access={access.F_UNAUTHORIZED}
        fallback={<Navigate to="/" />}
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
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game',
        element: (
          <CheckAccess
            access={access.F_PROTECTED}
            fallback={<Navigate to="/" />}
          >
            <Game />
          </CheckAccess>
        ),
      },
    ],
  },
])

export default router
