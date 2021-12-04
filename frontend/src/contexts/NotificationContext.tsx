import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { useToast } from '@chakra-ui/react'
import { createContext } from '../helpers'
import type { ToastId } from '@chakra-ui/react'
import type { LocalizedString } from 'typesafe-i18n'

type ToastType = ReturnType<typeof useToast>

type NotificationStatus = 'error' | 'info'

type NotificationType =
  | 'networkOnline'
  | 'networkOffline'
  | 'tokenExpired'
  | 'createLesson'
  | 'deleteLesson'
  | 'addFile'
  | 'editFile'
  | 'deleteFile'
  | 'createDeadline'
  | 'editDeadline'
  | 'deleteDeadline'
  | 'addDeadlineFile'
  | 'editDeadlineFile'
  | 'deleteDeadlineFile'
  | 'addSubmitDeadlineFile'
  | 'editSubmitDeadlineFile'
  | 'deleteSubmitDeadlineFile'

interface NotificationContent {
  title: LocalizedString
  description: LocalizedString
}

interface NotificationProviderProps {
  children: JSX.Element
}

interface NotificationContextProviderProps {
  toast: ToastType
  notify(status: NotificationStatus, type: NotificationType, duration?: number): ToastId | undefined
}

const [useNotification, NotificationContextProvider] = createContext<NotificationContextProviderProps>()

function NotificationProvider({ children }: NotificationProviderProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const toast = useToast()

  function getLocaleStatus(status: NotificationStatus): LocalizedString {
    switch (status) {
      case 'info':
        return LL.common.successfully()
      case 'error':
        return LL.common.failed()
      default:
        return LL.common.empty()
    }
  }

  function getLocaleDescription(status: NotificationStatus): LocalizedString {
    switch (status) {
      case 'info':
        return LL.common.success()
      case 'error':
        return LL.common.fail()
      default:
        return LL.common.empty()
    }
  }

  function getNotificationContent(notiStatus: NotificationStatus, type: NotificationType): NotificationContent {
    const status = getLocaleStatus(notiStatus).toLocaleLowerCase()
    const description = getLocaleDescription(notiStatus)
    let title = LL.common.empty()

    switch (type) {
      case 'networkOnline':
        title = LL.common.online()
        break
      case 'networkOffline':
        title = LL.common.offline()
        break
      case 'tokenExpired':
        title = LL.common.tokenExpired()
        break
      case 'createLesson':
        title = LL.lesson.createdStatus({ status })
        break
      case 'deleteLesson':
        title = LL.lesson.deletedStatus({ status })
        break
      case 'addFile':
        title = LL.lesson.addedFileStatus({ status })
        break
      case 'editFile':
        title = LL.lesson.editedFileStatus({ status })
        break
      case 'deleteFile':
        title = LL.lesson.deletedFileStatus({ status })
        break
      case 'createDeadline':
        title = LL.lesson.createdDeadlineStatus({ status })
        break
      case 'editDeadline':
        title = LL.lesson.editedDeadlineStatus({ status })
        break
      case 'deleteDeadline':
        title = LL.lesson.deletedDeadlineStatus({ status })
        break
      case 'addDeadlineFile':
        title = LL.lesson.addedDeadlineFileStatus({ status })
        break
      case 'editDeadlineFile':
        title = LL.lesson.editedDeadlineFileStatus({ status })
        break
      case 'deleteDeadlineFile':
        title = LL.lesson.deletedDeadlineFileStatus({ status })
        break
      case 'addSubmitDeadlineFile':
        title = LL.lesson.addedSubmitDeadlineFileStatus({ status })
        break
      case 'editSubmitDeadlineFile':
        title = LL.lesson.editedSubmittedDeadlineFileStatus({ status })
        break
      case 'deleteSubmitDeadlineFile':
        title = LL.lesson.deletedSubmittedDeadlineFileStatus({ status })
        break
    }

    return {
      title,
      description
    }
  }

  function notify(status: NotificationStatus, type: NotificationType, duration?: number) {
    const notiContent = getNotificationContent(status, type)

    return toast({
      title: notiContent.title,
      description: notiContent.description,
      status,
      position: 'bottom-right',
      variant: 'subtle',
      isClosable: true,
      duration
    })
  }

  const value: NotificationContextProviderProps = {
    toast,
    notify
  }

  return <NotificationContextProvider value={value}>{children}</NotificationContextProvider>
}

export default NotificationProvider
export { useNotification }
