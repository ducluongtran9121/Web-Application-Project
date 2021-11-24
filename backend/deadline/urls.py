from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

deadline_router = routers.SimpleRouter()
deadline_router.register(
    r'lecturerDeadlines',  LecturerDeadlineViewSet,  basename='lecturerDeadlines')

deadlineSubmit_router = routers.SimpleRouter()
deadlineSubmit_router.register(
    r'studentDeadlines', StudentDeadlineViewSet,  basename='studentDeadlines')

urlpatterns = [
    path('', DeadlineApiStructure.as_view()),
    path('<int:lesson_pk>/', include(deadline_router.urls)),
    path('<int:lesson_pk>/', include(deadlineSubmit_router.urls)),
    path('myDeadline/', StudentDeadlineStatusApiView.as_view())
    #path('<int:lesson_pk>', LessonMemberDeadlineApiView.as_view())
]
