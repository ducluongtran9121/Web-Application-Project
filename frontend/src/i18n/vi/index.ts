import type { Translation } from '../i18n-types'

const vi: Translation = {
  common: {
    logoAlt: 'Logo của Alunno',
    online: 'Bạn đang trực tuyến!',
    onlineDescription: 'Yay 😍😍😍!',
    offline: 'Bạn đang ngoại tuyến!',
    offlineDescription: 'Kiểm tra lại kết nối',
    success: 'Hurray 😊😊😊!',
    fail: '🥲🥲🥲',
    confirm: 'Xác nhận',
    cancel: 'Thoát',
    create: 'Tạo',
    edit: 'Sửa đổi',
    complete: 'Hoàn tất',
    add: 'Thêm',
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
  course: {
    description: 'Mô tả',
    lecturers: 'Giảng viên',
    allLessons: 'Tất cả bài học',
    allStudents: 'Tất cả học sinh',
    noLessons: 'Khoá học này không có bài học nào cả',
    noStudents: 'Khoá học này không có học sinh nào cả',
    students: 'Danh sách học sinh',
    enterEditing: 'Vào chế độ chỉnh sửa',
    finishEditing: 'Thoát chế độ chỉnh sửa'
  },
  lesson: {
    overdue: 'Quá hạn',
    timeRemainWithDay: 'Còn lại {day} ngày {hour} giờ',
    timeRemainWithHour: 'Còn lại {hour} giờ',
    name: 'Tên',
    namePlaceholder: 'Tên khoá học của bạn',
    description: 'Mô tả',
    descriptionPlaceholder: 'Mô tả cho khoá học của bạn',
    createNew: 'Tạo một bài học mới',
    createdSuccessfully: 'Tạo bài học thành công!',
    createdFailed: 'Tạo bài hoc thất bại!',
    delete: 'Xoá bài học',
    deleteConfirmDescription: 'Bạn có chắc muốn xoá bài học này',
    deletedSuccessfully: 'Xoá bài học thành công!',
    deletedFailed: 'Xoá bài học thất bại!',
    file: 'Tập tin',
    fileNamePlaceHolder: 'Tên tập tin của bạn',
    fileUpload: 'Tải tập tin lên',
    folder: 'Thư mục',
    folderPlaceholder: 'Tập tin sẽ được nằm trong folder có tên này',
    addFile: 'Thêm một tập tin mới',
    addedFileSuccessfully: 'Thêm tập tin thành công!',
    editFile: 'Sửa đổi tập tin',
    addedFileFailed: 'Thêm tập tin thất bại!',
    editedFileSuccessfully: 'Sửa đổi tập tin thành công!',
    editedFileFailed: 'Sửa đổi tập tin thất bại!',
    deleteFile: 'Xoá tập tin',
    deleteFileConfirmDescription: 'Bạn có chắc muốn xoá tập tin này',
    deletedFileSuccessfully: 'Xoá tập tin thành công!',
    deletedFileFailed: 'Xoá tập tin thất bại!'
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
