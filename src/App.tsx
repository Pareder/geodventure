import { RouterProvider } from 'react-router-dom'
import { APIProvider } from '@vis.gl/react-google-maps'
import AuthProvider from 'common/services/auth'
import { Toaster } from 'common/ui/sonner'
import router from './router'

export default function App() {
  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </APIProvider>
      <Toaster position="top-right" />
    </>
  )
}
