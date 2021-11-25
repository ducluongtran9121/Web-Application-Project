import * as React from 'react'
import { createContext } from '../helpers'

interface EditProviderProps {
  children: JSX.Element
}

interface EditContextProviderProps {
  isInEditingMode: boolean
  setInEditingMode: React.Dispatch<React.SetStateAction<boolean>>
}

const [useEdit, EditContextProvider] = createContext<EditContextProviderProps>()

function EditProvider({ children }: EditProviderProps): JSX.Element {
  const [isInEditingMode, setInEditingMode] = React.useState<boolean>(false)

  const value: EditContextProviderProps = {
    isInEditingMode,
    setInEditingMode
  }

  return <EditContextProvider value={value}>{children}</EditContextProvider>
}

export default EditProvider
export { useEdit }
