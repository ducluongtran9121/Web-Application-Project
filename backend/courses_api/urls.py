from django.urls import path
from .views import *

urlpatterns = [
    path('',CoursesAPIview.as_view()),
    path('<str:mskh>',CourseDetailAPIview.as_view()),
    path('<str:mskh>/student_list/',CourseStudentListAPIView.as_view()),
]