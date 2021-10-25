from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import LogoutView
urlpatterns = [
    path('',jwt_views.TokenObtainPairView.as_view(), name="login"),
    path('refreshtoken/', jwt_views.TokenRefreshView.as_view(), name="refresh_token"),
    path('logout/', LogoutView.as_view(), name='logout'),
]
