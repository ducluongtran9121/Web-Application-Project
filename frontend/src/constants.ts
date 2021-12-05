class Constants {
  public static readonly Api = class {
    public static readonly Base = process.env.REACT_APP_API_URL
    public static readonly SignIn = '/account/login/'
    public static readonly SignOut = '/account/logout/'
    public static readonly UserProfile = '/account/profile/'
    public static readonly RefreshToken = '/account/refreshtoken/'
    public static readonly Courses = '/courseAPI/courses/'
    public static readonly Course = (courseId: number) => `/courseAPI/courses/${courseId}/`
    public static readonly CourseMembers = (courseId: number) => `/courseAPI/courses/${courseId}/listMember/`
    public static readonly CourseLessons = (courseId: number) => `/courseAPI/courses/${courseId}/lessons/`
    public static readonly CourseLesson = (courseId: number, lessonId: number) => `/courseAPI/courses/${courseId}/lessons/${lessonId}/`
    public static readonly CourseLessonFiles = (courseId: number, lessonId: number) => `/courseAPI/courses/${courseId}/lessons/${lessonId}/files/`
    public static readonly CourseLessonFile = (courseId: number, lessonId: number, fileId: number) =>
      `/courseAPI/courses/${courseId}/lessons/${lessonId}/files/${fileId}/`
    public static readonly LecturerDeadlines = (lessonId: number) => `/deadlineAPI/${lessonId}/lecturerDeadlines/`
    public static readonly LecturerDeadline = (lessonId: number, deadlineId: number) => `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/`
    public static readonly LecturerDeadlinesStatus = (lessonId: number, deadlineId: number) =>
      `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/listStudentDeadlineStatus/`
    public static readonly LecturerDeadlineFiles = (lessonId: number, deadlineId: number) =>
      `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/files/`
    public static readonly LecturerDeadlineFile = (lessonId: number, deadlineId: number, fileId: number) =>
      `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/files/${fileId}/`
    public static readonly StudentDeadlines = '/deadlineAPI/myDeadlines/'
    public static readonly StudentLessonDeadlines = (lessonId: number) => `/deadlineAPI/${lessonId}/studentDeadlines/`
    public static readonly StudentLessonDeadline = (lessonId: number, submitId: number) => `/deadlineAPI/${lessonId}/studentDeadlines/${submitId}/`
    public static readonly StudentLessonDeadlineSubmit = (lessonId: number, submitId: number) =>
      `/deadlineAPI/${lessonId}/studentDeadlines/${submitId}/submit/`
    public static readonly StudentLessonDeadlineUnsubmit = (lessonId: number, submitId: number) =>
      `/deadlineAPI/${lessonId}/studentDeadlines/${submitId}/unsubmit/`
    public static readonly StudentLessonDeadlineFiles = (lessonId: number, submitId: number) =>
      `/deadlineAPI/${lessonId}/studentDeadlines/${submitId}/files/`
    public static readonly StudentLessonDeadlineFile = (lessonId: number, submitId: number, fileId: number) =>
      `/deadlineAPI/${lessonId}/studentDeadlines/${submitId}/files/${fileId}/`
  }

  public static readonly Error = class {
    public static readonly NoActiveAccount = 'No active account found with the given credentials'
    public static readonly FileNameToLong = 'Ensure this field has no more than 50 characters.'
  }
}

export default Constants
