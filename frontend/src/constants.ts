class Constants {
  public static readonly Api = class {
    public static readonly Base = import.meta.env.VITE_API_URL
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
    public static readonly studentDeadlines = '/deadlineAPI/myDeadlines/'
    public static readonly lecturerDeadlines = (lessonId: number) => `/deadlineAPI/${lessonId}/lecturerDeadlines/`
    public static readonly lecturerDeadline = (lessonId: number, deadlineId: number) => `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/`
    public static readonly lecturerDeadlineFiles = (lessonId: number, deadlineId: number) =>
      `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/files/`
    public static readonly lecturerDeadlineFile = (lessonId: number, deadlineId: number, fileId: number) =>
      `/deadlineAPI/${lessonId}/lecturerDeadlines/${deadlineId}/files/${fileId}/`
  }

  public static readonly Error = class {
    public static readonly NoActiveAccount = 'No active account found with the given credentials'
  }
}

export default Constants
