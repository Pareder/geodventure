import { ReactNode, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'
import AuthContext from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
