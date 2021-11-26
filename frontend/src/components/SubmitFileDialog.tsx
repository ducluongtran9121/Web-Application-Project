import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import type { ModalProps } from '@chakra-ui/react'

interface SubmitFileDialogProps extends Omit<ModalProps, 'children'> {
  children?: JSX.Element
  submitButtonContent: string
  heading: string
  onSubmit?(formData: FormData): Promise<void>
}

function SubmitFileDialog({ heading, submitButtonContent, onSubmit, onClose, ...rest }: SubmitFileDialogProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const fileUpLoadFileInputRef = React.useRef<HTMLInputElement>(null)
  const nameFileInputRef = React.useRef<HTMLInputElement>(null)
  const inFolderFileInputRef = React.useRef<HTMLInputElement>(null)
  const [isLoading, setLoading] = React.useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)
      if (onSubmit && nameFileInputRef.current?.value && fileUpLoadFileInputRef.current?.files && inFolderFileInputRef.current) {
        const formData = new FormData()
        formData.append('name', nameFileInputRef.current.value)
        formData.append('file_upload', fileUpLoadFileInputRef.current.files[0])
        formData.append('in_folder', inFolderFileInputRef.current.value)
        await onSubmit(formData)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      Promise.reject(err)
    }
  }

  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Flex} flexDirection="column" gridGap="0.75rem">
          <FormControl isRequired>
            <FormLabel>{LL.lesson.fileUpload()}</FormLabel>
            <Input type="file" border="0" ref={fileUpLoadFileInputRef} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.name()}</FormLabel>
            <Input placeholder={LL.lesson.fileNamePlaceHolder()} ref={nameFileInputRef} />
          </FormControl>
          <FormControl>
            <FormLabel>{LL.lesson.folder()}</FormLabel>
            <Input placeholder={LL.lesson.folderPlaceholder()} ref={inFolderFileInputRef} />
          </FormControl>
        </ModalBody>
        <ModalFooter as={Flex} gridGap="0.75rem">
          <Button onClick={onClose}>{LL.common.cancel()}</Button>
          <Button variant="accent" type="submit" isLoading={isLoading}>
            {submitButtonContent}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SubmitFileDialog
