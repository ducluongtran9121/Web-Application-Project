import * as React from 'react'

export function createContext<T extends {} | undefined>() {
  const context = React.createContext<T | undefined>(undefined)

  function useContext() {
    const c = React.useContext(context)
    if (c === undefined)
      throw new Error('useContext must be inside a Provider with a value')
    return c
  }

  return [useContext, context.Provider] as const
}
