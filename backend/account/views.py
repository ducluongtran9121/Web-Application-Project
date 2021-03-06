from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Member
from .serializers import MemberSerializer

# Create your views here.

class AccountAPIStructure(APIView):
    def get(self, request):
        return Response({
            "login/": "Login (Refresh Token + Access Token)",
            "refreshtoken/" : "Get Refresh Token",
            "logout/" : "logout" ,
            "profile/" : "user info" 
        })

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if self.request.data.get('all'):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = request.data["refresh"]
        refreshtoken = RefreshToken(refresh_token)
        refreshtoken.blacklist()
        return Response({"status": "OK, goodbye"})

class MemberProfileView(RetrieveUpdateDestroyAPIView):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()
    permission_classes = (IsAuthenticated,)
    parser_classes = (FormParser, MultiPartParser, JSONParser,)

    def get(self, request):
        userInfo = self.queryset.get(id=request.user.id)
        serializer = MemberSerializer(userInfo)
        return Response(serializer.data)
    
    def put(self, request):
        instance = self.queryset.get(id=request.user.id)
        serializer = MemberSerializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        if not not request.data.get('image',None):
            instance.image.delete()
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request):
        instance = self.queryset.get(id=request.user.id)
        instance.delete()
        return Response(status=204)

