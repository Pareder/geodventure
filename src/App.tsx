import { APIProvider } from '@vis.gl/react-google-maps'
import * as Ably from 'ably'
import { AblyProvider } from 'ably/react'
import { RouterProvider } from 'react-router-dom'

import AuthProvider from 'common/services/auth'
import { Toaster } from 'common/ui/sonner'

import router from './router'

const ably = new Ably.Realtime({
  authUrl: '/.netlify/functions/ably-token-request',
  autoConnect: false,
})

export default function App() {
  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
        <AblyProvider client={ably}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AblyProvider>
      </APIProvider>
      <Toaster position="top-right" />
    </>
  )
}
