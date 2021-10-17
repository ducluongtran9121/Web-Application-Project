from django.urls import path
from .views import *

urlpatterns = [
    path('',CoursesAPIview.as_view()),
    path('<int:pk>',CourseDetailAPIView.as_view()),
    path('lesson',LessonAPIView.as_view())
]