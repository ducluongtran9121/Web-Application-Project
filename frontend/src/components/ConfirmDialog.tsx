import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import type { ModalProps } from '@chakra-ui/react'

interface ConfirmDialogProps extends Omit<ModalProps, 'children'> {
  heading: string
  name: string
  description: string
  actionContent?: string
  cancelContent?: string
  children?: JSX.Element
  onConfirm(): Promise<void>
}

function ConfirmDialog({ heading, name, description, actionContent, cancelContent, onConfirm, onClose, ...rest }: ConfirmDialogProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [isLoading, setLoading] = React.useState<boolean>(false)

  async function handleConfirm() {
    setLoading(true)
    await onConfirm()
  }

  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {description}:{' '}
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>
            ?
          </Text>
        </ModalBody>
        <ModalFooter as={Flex} gridGap="0.75rem">
          <Button onClick={onClose}>{cancelContent ? cancelContent : LL.common.cancel()}</Button>
          <Button isLoading={isLoading} variant="accent" onClick={handleConfirm}>
            {actionContent ? actionContent : LL.common.confirm()}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDialog
