
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import *
from .models import *
# Create your views here.

class dmBanSon(APIView):
    def get(self,request):
        return Response({
            "" : "api structure",
            "login" : "login của bạn lương",
            "courses": "return course list",
            "courses/<mã khóa học>" : {
                "get" : "return course detail",
                "post" : "tạo khóa học (vẫn chưa làm)",
                "update" : "cập nhận thông tin cho khóa học (vẫn chưa làm)",
                "delete" : "xóa khóa học (vẫn chưa làm)"
                },
            }
        )

class dmBanLuong(APIView):
    def get(self,request):
        return Response({'Chua lam':True})


class CoursesAPIview(APIView):
    def get(self,request):
        courseList = Course.objects.all()
        serializer = CourseSerializer(courseList,many=True)
        return Response(serializer.data)

class CourseDetailAPIview(APIView):
    def get(self,request,mskh):
        courseQuery = Course.objects.filter(mskh=mskh)
        if courseQuery.exists():
            serializer = CourseDetailSerializer(courseQuery[0])
            return Response(serializer.data)
        return Response({'error':'Object not found'},status=404)
