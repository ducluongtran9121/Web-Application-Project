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
  const inFolderFileInputRef = React.useRef<HTMLInputElement>(null)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [fileName, setFileName] = React.useState<string>('')
  const [isLoading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  function handleFileNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFileName(e.target.files[0].name)
    }
  }

  function handleClose(): void {
    setFileName('')
    onClose()
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    try {
      setLoading(true)
      if (onSubmit && fileUpLoadFileInputRef.current?.files && inFolderFileInputRef.current) {
        const formData = new FormData()
        formData.append('name', fileName)
        formData.append('file_upload', fileUpLoadFileInputRef.current.files[0])
        formData.append('in_folder', inFolderFileInputRef.current.value)
        await onSubmit(formData)
        if (isMounted) setLoading(false)
        handleClose()
      }
    } catch (err) {
      Promise.reject(err)
    }

    if (isMounted) setLoading(false)
  }

  return (
    <Modal onClose={handleClose} {...rest}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Flex} flexDirection="column" gridGap="0.75rem">
          <FormControl isRequired>
            <FormLabel>{LL.lesson.fileUpload()}</FormLabel>
            <Input type="file" border="0" onChange={handleFileChange} ref={fileUpLoadFileInputRef} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.name()}</FormLabel>
            <Input placeholder={LL.lesson.fileNamePlaceHolder()} value={fileName} onChange={handleFileNameChange} />
          </FormControl>
          <FormControl>
            <FormLabel>{LL.lesson.folder()}</FormLabel>
            <Input placeholder={LL.lesson.folderPlaceholder()} ref={inFolderFileInputRef} />
          </FormControl>
        </ModalBody>
        <ModalFooter as={Flex} gridGap="0.75rem">
          <Button onClick={handleClose}>{LL.common.cancel()}</Button>
          <Button variant="accent" type="submit" isLoading={isLoading}>
            {submitButtonContent}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SubmitFileDialog
