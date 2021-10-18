
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
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


# class CoursesAPIview(APIView):
#     def get(self,request):
#         courseList = Course.objects.all()
#         serializer = CourseSerializer(courseList,many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = CourseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'success':'Object is created'},status=201)
#         return Response({'error':serializer.errors},status=serializer.status)

# class CourseDetailAPIView(APIView):
#     def get(self,request,pk):
#         courseQuery = Course.objects.filter(id=pk)
#         if courseQuery.exists():
#             serializer = CourseDetailSerializer(courseQuery[0])
#             return Response(serializer.data)
#         return Response({'error':'Object not found'},status=404)

#     def put(self,request,pk):
#         courseQuery = Course.objects.filter(id=pk)
#         if courseQuery.exists():
#             instance = courseQuery[0]
#             serializer = CourseDetailSerializer(data=request.data,instance=instance)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({'success':'Update success'})
#             return Response({'error':serializer.errors},status=400)
#         return Response({'error':'Object not found'},status=404)


# class CourseLessonDetailAPIView(APIView):
#     def get(self, request, pk):
#         courseQuery = Course.objects.filter(id=pk)
#         if courseQuery.exists():
#             lessonQuery = Lesson.objects.filter(course=courseQuery[0])
#             serializer = CourseLessonDetailSerializer(lessonQuery,many=True)
#             return Response(serializer.data)
#         return Response({'error':'Object not found'},status=404)

class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset=Course.objects.all()

    def list(self, request, member_pk=None):
        queryset = self.queryset.filter(course_member=member_pk)
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, member_pk=None):
        queryset = self.queryset.filter(pk=pk, course_member=member_pk)
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)


    
class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def list(self, request, member_pk=None, course_pk=None):
        queryset = self.queryset.filter(course=course_pk)
        serializer = LessonSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, member_pk=None,course_pk=None):
        queryset = self.queryset.filter(pk=pk, course=course_pk)
        lesson = get_object_or_404(queryset, pk=pk)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)

