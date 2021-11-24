import type { Translation } from '../i18n-types'

const vi: Translation = {
  common: {
    logoAlt: 'Logo của Alunno',
    on: 'Bật',
    off: 'Tắt'
  },
  error: {
    default: 'Có lỗi xảy ra! Vui lòng thử lại!',
    network: 'Lỗi mạng!',
    sessionExpired: 'Phiên đăng nhập hết hạn!',
    incorrectEmailPassword: 'Email hoặc password không đúng!'
  },
  signIn: {
    heading: 'Đăng nhập vào Alunno',
    email: 'Email',
    password: 'Mật khẩu',
    signIn: 'Đăng nhập',
    forgotPassword: 'Quên mật khẩu?'
  },
  footer: {
    description: 'Một ứng dụng web quản lý các khoá học',
    makeWithLove: 'Được tạo nên bởi ❤️',
    and: 'và',
    contact: 'Liên hệ',
    about: 'Về chúng tôi'
  },
  navbar: {
    searchBoxPlaceHolder: 'Tìm một thứ gì đó....',
    signOut: 'Đăng xuất',
    yourProfile: 'Thông tin của bạn',
    yourCourses: 'Khoá học của bạn',
    yourDeadlines: 'Bài tập của bạn',
    appearance: 'Giao diện',
    darkMode: 'Chế độ tối',
    languages: 'Ngôn ngữ'
  },
  courses: {
    description: 'Mô tả',
    lecturers: 'Giảng viên',
    allStudents: 'Tất cả học sinh',
    noLessons: 'Khoá học này không có bài học nào cả',
    noStudents: 'Khoá học này không có học sinh nào cả',
    students: 'Danh sách học sinh'
  },
  lesson: {
    overdue: 'Quá hạn',
    timeRemainWithDay: 'Còn lại {day} ngày {hour} giờ',
    timeRemainWithHour: 'Còn lại {hour} giờ'
  },
  user: {
    overview: 'Tổng quan',
    courses: 'Khoá học',
    deadlines: 'Bài tập',
    noCourses: 'Bạn không có khoá học nào cả',
    survived: 'Bạn đã sống! Bây giờ thôi...',
    empty: 'Ở đây không có gì!',
    student: 'Học sinh',
    lecturer: 'Giảng viên'
  }
}

export default vi
