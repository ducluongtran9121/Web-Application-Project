import datetime
from django.http import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

# Create your views here.

class AccountAPIStructure(APIView):
    def get(self, request):
        return Response({
            "/login": "Login (Refresh Token + Access Token)",
            "/refreshtoken" : "Get Refresh Token",
            "/logout" : "logout" 
        })

# class LoginApiView(APIView):
#     def get(self, request):
#         return response({'Chua lam': True})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if self.request.data.get('all'):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = request.data["refresh"]
        # access_token = request.data["access"]
        refreshtoken = RefreshToken(refresh_token)
        # accesstoken = refreshtoken.access_token
        # accesstoken.set_exp(from_time=datetime.datetime.now(),lifetime=datetime.timedelta(seconds=1))
        refreshtoken.blacklist()
        return Response({"status": "OK, goodbye"})
