
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

    def post(self, request):
        print(request.data)
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success':'Object is created'},status=201)
        return Response({'error':serializer.errors},status=serializer.status)

class CourseDetailAPIView(APIView):
    def get(self,request,pk):
        courseQuery = Course.objects.filter(id=pk)
        if courseQuery.exists():
            serializer = CourseDetailSerializer(courseQuery[0])
            return Response(serializer.data)
        return Response({'error':'Object not found'},status=404)

    def put(self,request,pk):
        courseQuery = Course.objects.filter(id=pk)
        if courseQuery.exists():
            instance = courseQuery[0]
            serializer = CourseDetailSerializer(data=request.data,instance=instance)
            if serializer.is_valid():
                serializer.save()
                return Response({'success':'Update success'})
            return Response({'error':serializer.errors},status=404)
        return Response({'error':'Object not found'},status=404)


class LessonAPIView(APIView):
    def get(self,request):
        courseList = Lesson.objects.all()
        serializer = LessonSerializer(courseList,many=True)
        return Response(serializer.data)
    

