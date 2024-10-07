import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Navigate to="/" />,
  },
])

export default router
