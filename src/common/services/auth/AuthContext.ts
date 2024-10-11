import { createContext } from 'react'
import { User } from 'firebase/auth'

type AuthContextType = {
  user: User | null
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export default AuthContext
