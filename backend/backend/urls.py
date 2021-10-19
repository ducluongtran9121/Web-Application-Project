"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from alunno_api.views import dmBanSon,dmBanLuong,CourseViewSet,MemberViewSet,LessonViewSet,FileViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
#router = DefaultRouter()
#router.register(r"courses", CourseViewSet)
member_router = routers.SimpleRouter()
member_router.register(r'members', MemberViewSet, basename='members')

course_router = routers.NestedSimpleRouter(member_router, r'members', lookup='member')
course_router.register(r'courses', CourseViewSet,  basename='courses')

lesson_router = routers.NestedSimpleRouter(course_router, r'courses', lookup='course')
lesson_router.register(r'lessons', LessonViewSet,  basename='lessons')

file_router = routers.NestedSimpleRouter(lesson_router, r'lessons', lookup='lesson')
file_router.register(r'files', FileViewSet,  basename='files')

urlpatterns = [
    path('',dmBanSon.as_view()),
    path('login',dmBanLuong.as_view()),
    path('admin/', admin.site.urls),
    path('',include(member_router.urls)),
    path('',include(course_router.urls)),
    path('',include(lesson_router.urls)),
    path('',include(file_router.urls))
    #path('',include(router.urls))
    #path('courses/',include('courses_api.urls')),
] + static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
