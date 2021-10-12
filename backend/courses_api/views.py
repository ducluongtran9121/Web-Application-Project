from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import StudentSerializer
from .models import *
# Create your views here.

class StudentAPIView(APIView):

    def get(self,request):
        studentList = Student.objects.all()
        serializer = StudentSerializer(studentList,many=True)
        print(serializer)
        return Response(serializer.data)
