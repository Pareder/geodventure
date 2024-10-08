import { ReactNode, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import AuthContext from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}
