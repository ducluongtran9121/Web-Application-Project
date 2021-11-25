import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
  common: {
    logoAlt: 'Logo of Alunno',
    online: 'You are online!',
    onlineDescription: 'Yay 😍😍😍!',
    offline: 'You are offline!',
    offlineDescription: 'Please check your connection!',
    on: 'On',
    off: 'Off'
  },
  error: {
    default: 'An error happened! Please try again!',
    network: 'Network error!',
    sessionExpired: 'Session expired!',
    incorrectEmailPassword: 'Incorrect email or password!'
  },
  signIn: {
    heading: 'Sign in to Alunno',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    forgotPassword: 'Forgot your password?'
  },
  footer: {
    description: 'A web-based courses management application',
    makeWithLove: 'Make with ❤️',
    and: 'and',
    contact: 'Contact',
    about: 'About'
  },
  navbar: {
    searchBoxPlaceHolder: 'Search something....',
    signOut: 'Sign out',
    yourProfile: 'Your profiles',
    yourCourses: 'Your courses',
    yourDeadlines: 'Your deadlines',
    appearance: 'Appearance',
    darkMode: 'Dark mode',
    languages: 'Languages'
  },
  courses: {
    description: 'Description',
    lecturers: 'Lecturers',
    allStudents: 'All Students',
    noLessons: "This course don't have any lessons",
    noStudents: "This course doesn't have any lessons",
    students: 'Students'
  },
  lesson: {
    overdue: 'Overdue',
    timeRemainWithDay: '{day} day {hour} hour remain',
    timeRemainWithHour: '{hour} hour remain'
  },
  user: {
    overview: 'Overview',
    courses: 'Courses',
    deadlines: 'Deadlines',
    noCourses: "You don't have any courses",
    survived: 'You survived! For now..',
    empty: "It's empty here!",
    student: 'Student',
    lecturer: 'Lecturer'
  }
}

export default en
