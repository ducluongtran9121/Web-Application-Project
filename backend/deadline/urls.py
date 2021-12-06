from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

deadline_router = routers.SimpleRouter()
deadline_router.register(
    r'lecturerDeadlines',  LecturerDeadlineViewSet,  basename='lecturerDeadlines')

deadlineFile_router = routers.NestedSimpleRouter(
    deadline_router, r'lecturerDeadlines', lookup='deadline')
deadlineFile_router.register(
    r'files', DeadlineFileViewSet,  basename='files')

deadlineSubmit_router = routers.SimpleRouter()
deadlineSubmit_router.register(
    r'studentDeadlines', StudentDeadlineViewSet,  basename='studentDeadlines')

deadlineFileSubmit_router = routers.NestedSimpleRouter(
    deadlineSubmit_router, r'studentDeadlines', lookup='deadlineSubmit')
deadlineFileSubmit_router.register(
    r'files', DeadlineSubmitFileViewSet,  basename='files')


urlpatterns = [
    path('', DeadlineApiStructure.as_view()),
    path('<int:lesson_pk>/', include(deadline_router.urls)),
    path('<int:lesson_pk>/', include(deadlineSubmit_router.urls)),
    path('myDeadlines/', StudentDeadlineStatusApiView.as_view()),
    path('<int:lesson_pk>/', include(deadlineFileSubmit_router.urls)),
    path('<int:lesson_pk>/', include(deadlineFile_router.urls))
]
