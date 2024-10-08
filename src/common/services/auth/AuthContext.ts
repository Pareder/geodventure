import { createContext } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export default AuthContext
