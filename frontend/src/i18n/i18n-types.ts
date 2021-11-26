// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType } from 'typesafe-i18n'
import type { LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales = 'en' | 'vi'

export type Translation = {
  common: {
    /**
     * Logo of Alunno
     */
    logoAlt: string
    /**
     * You are online!
     */
    online: string
    /**
     * Yay 😍😍😍!
     */
    onlineDescription: string
    /**
     * You are offline!
     */
    offline: string
    /**
     * Please check your connection!
     */
    offlineDescription: string
    /**
     * Hurray 😊😊😊!
     */
    success: string
    /**
     * 🥲🥲🥲
     */
    fail: string
    /**
     * Confirm
     */
    confirm: string
    /**
     * Cancel
     */
    cancel: string
    /**
     * Create
     */
    create: string
    /**
     * Add
     */
    add: string
    /**
     * On
     */
    on: string
    /**
     * Off
     */
    off: string
  }
  error: {
    /**
     * An error happened! Please try again!
     */
    default: string
    /**
     * Network error!
     */
    network: string
    /**
     * Session expired!
     */
    sessionExpired: string
    /**
     * Incorrect email or password!
     */
    incorrectEmailPassword: string
  }
  signIn: {
    /**
     * Sign in to Alunno
     */
    heading: string
    /**
     * Email
     */
    email: string
    /**
     * Password
     */
    password: string
    /**
     * Sign in
     */
    signIn: string
    /**
     * Forgot your password?
     */
    forgotPassword: string
  }
  footer: {
    /**
     * A web-based courses management application
     */
    description: string
    /**
     * Make with ❤️
     */
    makeWithLove: string
    /**
     * and
     */
    and: string
    /**
     * Contact
     */
    contact: string
    /**
     * About
     */
    about: string
  }
  navbar: {
    /**
     * Search something....
     */
    searchBoxPlaceHolder: string
    /**
     * Sign out
     */
    signOut: string
    /**
     * Your profiles
     */
    yourProfile: string
    /**
     * Your courses
     */
    yourCourses: string
    /**
     * Your deadlines
     */
    yourDeadlines: string
    /**
     * Appearance
     */
    appearance: string
    /**
     * Dark mode
     */
    darkMode: string
    /**
     * Languages
     */
    languages: string
  }
  course: {
    /**
     * Description
     */
    description: string
    /**
     * Lecturers
     */
    lecturers: string
    /**
     * All Students
     */
    allStudents: string
    /**
     * This course don't have any lessons
     */
    noLessons: string
    /**
     * This course doesn't have any lessons
     */
    noStudents: string
    /**
     * Students
     */
    students: string
    /**
     * Enter editing mode
     */
    enterEditing: string
    /**
     * Exit editing mode
     */
    finishEditing: string
  }
  lesson: {
    /**
     * Overdue
     */
    overdue: string
    /**
     * {day} day {hour} hour remain
     * @param {unknown} day
     * @param {unknown} hour
     */
    timeRemainWithDay: RequiredParams2<'day', 'hour'>
    /**
     * {hour} hour remain
     * @param {unknown} hour
     */
    timeRemainWithHour: RequiredParams1<'hour'>
    /**
     * Create a new lesson
     */
    createNew: string
    /**
     * Name
     */
    name: string
    /**
     * Your lesson name
     */
    namePlaceholder: string
    /**
     * Description
     */
    description: string
    /**
     * Your lesson description
     */
    descriptionPlaceholder: string
    /**
     * Created lesson successfully!
     */
    createdSuccessfully: string
    /**
     * Created lesson failed!
     */
    createdFailed: string
    /**
     * Delete lesson?
     */
    deleteConfirm: string
    /**
     * Are you sure to delete this lesson?
     */
    deleteConfirmDescription: string
    /**
     * Deleted lesson successfully!
     */
    deletedSuccessfully: string
    /**
     * Deleted lesson failed
     */
    deletedFailed: string
    /**
     * File
     */
    file: string
    /**
     * Add a new file
     */
    addFile: string
    /**
     * Your file name
     */
    fileNamePlaceHolder: string
    /**
     * File upload
     */
    fileUpload: string
    /**
     * Folder
     */
    folder: string
    /**
     * This file will in this folder name
     */
    folderPlaceholder: string
    /**
     * Added file successfully!
     */
    addedFileSuccessfully: string
    /**
     * Added file failed!
     */
    addedFileFailed: string
  }
  user: {
    /**
     * Overview
     */
    overview: string
    /**
     * Courses
     */
    courses: string
    /**
     * Deadlines
     */
    deadlines: string
    /**
     * You don't have any courses
     */
    noCourses: string
    /**
     * You survived! For now..
     */
    survived: string
    /**
     * It's empty here!
     */
    empty: string
    /**
     * Student
     */
    student: string
    /**
     * Lecturer
     */
    lecturer: string
  }
}

export type TranslationFunctions = {
  common: {
    /**
     * Logo of Alunno
     */
    logoAlt: () => LocalizedString
    /**
     * You are online!
     */
    online: () => LocalizedString
    /**
     * Yay 😍😍😍!
     */
    onlineDescription: () => LocalizedString
    /**
     * You are offline!
     */
    offline: () => LocalizedString
    /**
     * Please check your connection!
     */
    offlineDescription: () => LocalizedString
    /**
     * Hurray 😊😊😊!
     */
    success: () => LocalizedString
    /**
     * 🥲🥲🥲
     */
    fail: () => LocalizedString
    /**
     * Confirm
     */
    confirm: () => LocalizedString
    /**
     * Cancel
     */
    cancel: () => LocalizedString
    /**
     * Create
     */
    create: () => LocalizedString
    /**
     * Add
     */
    add: () => LocalizedString
    /**
     * On
     */
    on: () => LocalizedString
    /**
     * Off
     */
    off: () => LocalizedString
  }
  error: {
    /**
     * An error happened! Please try again!
     */
    default: () => LocalizedString
    /**
     * Network error!
     */
    network: () => LocalizedString
    /**
     * Session expired!
     */
    sessionExpired: () => LocalizedString
    /**
     * Incorrect email or password!
     */
    incorrectEmailPassword: () => LocalizedString
  }
  signIn: {
    /**
     * Sign in to Alunno
     */
    heading: () => LocalizedString
    /**
     * Email
     */
    email: () => LocalizedString
    /**
     * Password
     */
    password: () => LocalizedString
    /**
     * Sign in
     */
    signIn: () => LocalizedString
    /**
     * Forgot your password?
     */
    forgotPassword: () => LocalizedString
  }
  footer: {
    /**
     * A web-based courses management application
     */
    description: () => LocalizedString
    /**
     * Make with ❤️
     */
    makeWithLove: () => LocalizedString
    /**
     * and
     */
    and: () => LocalizedString
    /**
     * Contact
     */
    contact: () => LocalizedString
    /**
     * About
     */
    about: () => LocalizedString
  }
  navbar: {
    /**
     * Search something....
     */
    searchBoxPlaceHolder: () => LocalizedString
    /**
     * Sign out
     */
    signOut: () => LocalizedString
    /**
     * Your profiles
     */
    yourProfile: () => LocalizedString
    /**
     * Your courses
     */
    yourCourses: () => LocalizedString
    /**
     * Your deadlines
     */
    yourDeadlines: () => LocalizedString
    /**
     * Appearance
     */
    appearance: () => LocalizedString
    /**
     * Dark mode
     */
    darkMode: () => LocalizedString
    /**
     * Languages
     */
    languages: () => LocalizedString
  }
  course: {
    /**
     * Description
     */
    description: () => LocalizedString
    /**
     * Lecturers
     */
    lecturers: () => LocalizedString
    /**
     * All Students
     */
    allStudents: () => LocalizedString
    /**
     * This course don't have any lessons
     */
    noLessons: () => LocalizedString
    /**
     * This course doesn't have any lessons
     */
    noStudents: () => LocalizedString
    /**
     * Students
     */
    students: () => LocalizedString
    /**
     * Enter editing mode
     */
    enterEditing: () => LocalizedString
    /**
     * Exit editing mode
     */
    finishEditing: () => LocalizedString
  }
  lesson: {
    /**
     * Overdue
     */
    overdue: () => LocalizedString
    /**
     * {day} day {hour} hour remain
     */
    timeRemainWithDay: (arg: { day: unknown; hour: unknown }) => LocalizedString
    /**
     * {hour} hour remain
     */
    timeRemainWithHour: (arg: { hour: unknown }) => LocalizedString
    /**
     * Create a new lesson
     */
    createNew: () => LocalizedString
    /**
     * Name
     */
    name: () => LocalizedString
    /**
     * Your lesson name
     */
    namePlaceholder: () => LocalizedString
    /**
     * Description
     */
    description: () => LocalizedString
    /**
     * Your lesson description
     */
    descriptionPlaceholder: () => LocalizedString
    /**
     * Created lesson successfully!
     */
    createdSuccessfully: () => LocalizedString
    /**
     * Created lesson failed!
     */
    createdFailed: () => LocalizedString
    /**
     * Delete lesson?
     */
    deleteConfirm: () => LocalizedString
    /**
     * Are you sure to delete this lesson?
     */
    deleteConfirmDescription: () => LocalizedString
    /**
     * Deleted lesson successfully!
     */
    deletedSuccessfully: () => LocalizedString
    /**
     * Deleted lesson failed
     */
    deletedFailed: () => LocalizedString
    /**
     * File
     */
    file: () => LocalizedString
    /**
     * Add a new file
     */
    addFile: () => LocalizedString
    /**
     * Your file name
     */
    fileNamePlaceHolder: () => LocalizedString
    /**
     * File upload
     */
    fileUpload: () => LocalizedString
    /**
     * Folder
     */
    folder: () => LocalizedString
    /**
     * This file will in this folder name
     */
    folderPlaceholder: () => LocalizedString
    /**
     * Added file successfully!
     */
    addedFileSuccessfully: () => LocalizedString
    /**
     * Added file failed!
     */
    addedFileFailed: () => LocalizedString
  }
  user: {
    /**
     * Overview
     */
    overview: () => LocalizedString
    /**
     * Courses
     */
    courses: () => LocalizedString
    /**
     * Deadlines
     */
    deadlines: () => LocalizedString
    /**
     * You don't have any courses
     */
    noCourses: () => LocalizedString
    /**
     * You survived! For now..
     */
    survived: () => LocalizedString
    /**
     * It's empty here!
     */
    empty: () => LocalizedString
    /**
     * Student
     */
    student: () => LocalizedString
    /**
     * Lecturer
     */
    lecturer: () => LocalizedString
  }
}

export type Formatters = {}

type Param<P extends string> = `{${P}}`

type Params1<P1 extends string> = `${string}${Param<P1>}${string}`

type Params2<P1 extends string, P2 extends string> = `${string}${Param<P1>}${string}${Param<P2>}${string}`

type RequiredParams1<P1 extends string> = Params1<P1>

type RequiredParams2<P1 extends string, P2 extends string> = Params2<P1, P2> | Params2<P2, P1>
