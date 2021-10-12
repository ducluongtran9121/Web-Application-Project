from django.urls import path
from .views import *

urlpatterns = [
    path('studentList/',StudentAPIView.as_view())
]