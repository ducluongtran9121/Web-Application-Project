import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import type { ModalProps } from '@chakra-ui/react'

interface ConfirmDialogProps extends Omit<ModalProps, 'children'> {
  heading: string
  description: string
  actionContent?: string
  cancelContent?: string
  children?: JSX.Element
  onConfirm(): void
}

function ConfirmDialog({ heading, description, actionContent, cancelContent, onConfirm, onClose, ...rest }: ConfirmDialogProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)

  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="accent" onClick={onConfirm}>
              {actionContent ? actionContent : LL.common.confirm()}
            </Button>
            <Button onClick={onClose}>{cancelContent ? cancelContent : LL.common.cancel()}</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ConfirmDialog
