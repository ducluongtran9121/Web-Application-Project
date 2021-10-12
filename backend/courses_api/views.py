from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import *
from .models import *
# Create your views here.

class dmbanSon(APIView):
    def get(self,request):
        return Response({
            "" : "cấu trúc đường dẫn api",
            "login" : "login của bạn lương",
            "courses": "chưa làm",
            "courses/<mã khóa học>" : {
                "get" : "thông tin chi tiết khóa học (vẫn chưa làm)",
                "post" : "tạo khóa học (vẫn chưa làm)",
                "update" : "cập nhận thông tin cho khóa học (vẫn chưa làm)",
                "delete" : "xóa khóa học (vẫn chưa làm)"
                },
            "courses/<mã khóa học>/student_list": "cái tên nói lên tất cả nhưng vẫn chưa làm"
            }
        )

class dmbanLuong(APIView):
    def get(self,request):
        return Response({'Chua lam':True})

class StudentAPIView(APIView):

    def get(self,request):
        studentList = Student.objects.all()
        serializer = StudentSerializer(studentList,many=True)
        print(serializer)
        return Response(serializer.data)

class CoursesAPIview(APIView):
    def get(self,request):
        return Response({'Chua lam':True})

class CourseDetailAPIview(APIView):
    def get(self,request):
        return Response({'Chua lam':True})

class CourseStudentListAPIView(APIView):
    def get(self,request):
        return Response({'Chua lam':True})