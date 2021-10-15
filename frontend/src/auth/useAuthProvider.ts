import { User } from '../models'
import { useState } from 'react'

export interface AuthProviderProps {
  user: User | null
  signIn: () => void
  signOut: () => void
}

const useAuthProvider = (): AuthProviderProps => {
  const [user, setUser] = useState<User | null>(null)

  function signIn() {}
  function signOut() {}

  return {
    user,
    signIn,
    signOut,
  }
}

export default useAuthProvider
