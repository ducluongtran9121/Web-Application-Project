import * as React from 'react'
import { useContext } from 'react'
import useAuthProvider, { AuthProviderProps } from './useAuthProvider'

interface Props {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthProviderProps | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }: Props) {
  const value = useAuthProvider()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
