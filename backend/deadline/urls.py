from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

deadline_router = routers.SimpleRouter()
deadline_router.register(
    r'deadlines', DeadlineViewSet,  basename='deadlines')

deadlineSubmit_router = routers.SimpleRouter()
deadlineSubmit_router.register(
    r'deadlineSubmits', DeadlineSubmitViewSet,  basename='deadlineSubmits')

urlpatterns = [
    path('', include(deadlineSubmit_router.urls)),
    path('<int:lesson_pk>/', include(deadline_router.urls))
    #path('', MemberDeadlineApiView.as_view()),
    #path('<int:lesson_pk>', LessonMemberDeadlineApiView.as_view())
]
