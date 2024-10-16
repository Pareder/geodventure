import { ReactNode, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'

import Loader from 'common/components/Loader'

import { auth } from '../firebase'
import AuthContext from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setLoading(false)
      setUser(user)
    })
  }, [])

  if (isLoading) {
    return (
      <Loader
        size={64}
        isFullHeight
      />
    )
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
