from django.urls import path, include
from .views import *

#from course.views import ApiStructure, CourseViewSet, MemberViewSet, LessonViewSet, FileViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

course_router = routers.SimpleRouter()
course_router.register(r'courses', CourseViewSet,  basename='courses')

lesson_router = routers.NestedSimpleRouter(
    course_router, r'courses', lookup='course')
lesson_router.register(r'lessons', LessonViewSet,  basename='lessons')

file_router = routers.NestedSimpleRouter(
    lesson_router, r'lessons', lookup='lesson')
file_router.register(r'files', LessonFileViewSet,  basename='files')

urlpatterns = [
    path('courses/<int:pk>/addMemberWithEmail/',
         AddMemberWithEmail.as_view()),
    path('courses/<int:pk>/removeMemberWithEmail/',
         RemoveMemberWithEmail.as_view()),
    path('', CourseApiStructure.as_view()),
    path('', include(course_router.urls)),
    path('', include(lesson_router.urls)),
    path('', include(file_router.urls)),
]
