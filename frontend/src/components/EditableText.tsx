/* eslint-disable react/no-children-prop */
import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  InputRightElement,
  Tooltip,
  useEditableControls
} from '@chakra-ui/react'
import { FiCheck, FiX, FiEdit } from 'react-icons/fi'
import type { EditableProps } from '@chakra-ui/react'

interface EditableTextProps extends EditableProps {
  isInEditingMode?: boolean
  isRequired?: boolean
  onEditSubmit(currentValue: string): void
}

function EditableButton(): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls()

  return isEditing ? (
    <ButtonGroup isAttached justifyContent="center" size="sm">
      <Tooltip label={LL.common.complete()}>
        <IconButton aria-label="Finish edit" icon={<Icon as={FiCheck} />} {...getSubmitButtonProps()} />
      </Tooltip>
      <Tooltip label={LL.common.cancel()}>
        <IconButton aria-label="Cancel edit" icon={<Icon as={FiX} />} {...getCancelButtonProps()} />
      </Tooltip>
    </ButtonGroup>
  ) : (
    <Flex visibility="hidden" _groupHover={{ visibility: 'visible' }}>
      <Tooltip label={LL.common.edit()}>
        <IconButton aria-label="Start edit" size="sm" icon={<Icon as={FiEdit} />} {...getEditButtonProps()} />
      </Tooltip>
    </Flex>
  )
}

function EditableText({ isInEditingMode = true, isRequired, defaultValue = '', onEditSubmit, ...rest }: EditableTextProps): JSX.Element {
  const editableInputRef = React.useRef<HTMLInputElement>(null)
  const [isShouldSaveValue, SetShouldSaveValue] = React.useState<boolean>(false)
  const [saveValue, setSaveValue] = React.useState<string>('')
  const [value, setValue] = React.useState<string>(defaultValue)

  function handleEdit(): void {
    if (!isShouldSaveValue) {
      SetShouldSaveValue(true)
      if (editableInputRef.current) setSaveValue(editableInputRef.current.value)
    }
  }

  function handleChange(nextValue: string): void {
    setValue(nextValue)
  }

  function handleSubmit(nextValue: string): void {
    let tempValue = ''
    if (nextValue === '' && isRequired) {
      tempValue = saveValue
      setValue(saveValue)
    } else {
      tempValue = nextValue
    }

    SetShouldSaveValue(false)

    if (onEditSubmit) onEditSubmit(tempValue)
  }

  return (
    <Editable
      position="relative"
      role="group"
      value={value}
      isPreviewFocusable={false}
      onEdit={handleEdit}
      onChange={handleChange}
      onSubmit={handleSubmit}
      {...rest}
    >
      <EditablePreview />
      <EditableInput py="0.35rem" ref={editableInputRef} />
      {isInEditingMode && (
        <InputRightElement top="50%" right="0.25rem" sx={{ transform: 'translateY(-50%)' }}>
          <EditableButton />
        </InputRightElement>
      )}
    </Editable>
  )
}

export default EditableText
