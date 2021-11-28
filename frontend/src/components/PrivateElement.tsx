import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { TokenStorage } from '../helpers'

interface PrivateElementProps {
  children: JSX.Element
}

function PrivateElement({ children }: PrivateElementProps): JSX.Element {
  const location = useLocation()

  if (TokenStorage.getToken('access')) return children

  return <Navigate to="/signin" state={{ from: location }} />
}

export default PrivateElement
