import { RouterProvider } from 'react-router-dom'
import { APIProvider } from '@vis.gl/react-google-maps'
import { SnackbarProvider } from 'notistack'
import AuthProvider from 'common/services/auth'
import router from './router'

export default function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </APIProvider>
    </SnackbarProvider>
  )
}
