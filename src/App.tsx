import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthProvider from 'common/services/auth'
import router from './router'

export default function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  )
}
