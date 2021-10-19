
from rest_framework.response import Response
from rest_framework.parsers import FormParser,MultiPartParser,JSONParser
from rest_framework.views import APIView
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin
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
            "members":
            {
                "get" : "return member list (will be disabled in future)",
                "post" : "create a member (will be disabled in future)",
            },
            "members/pk":
            {
                "get" : "returns the details of member whose id is pk",
                "put" : "update member whose id is pko",
                "delete" : "delete member whose id is pk",
            },
            "members/member_pk/courses":
            {
                "get" : "return course list of member whose id is member_pk",
                "post": "create course for member whose id is member"
            },
            "members/member_pk/courses/pk":
            {
                "get" : "returns the details of course",
                "put" : "update course",
                "delete" : "delete course",
            },
            "members/member_pk/courses/courseMember": "return course member list",
            "members/member_pk/courses/course_pk/lesson":
            {
                "get" : "return lesson list",
                "post": "create lesson"
            },
            "members/member_pk/courses/course_pk/lesson/pk":
            {
                "get" : "returns the details of lesson",
                "put" : "update lesson",
                "delete" : "delete lesson",
            },
            "members/member_pk/courses/course_pk/lesson/lesson_pk/files":
            {
                "get" : "return file list",
                "post": "create file"
            },
            "members/member_pk/courses/course_pk/lesson/lesson_pk/files/pk":
            {
                "get" : "returns the details of file",
                "put" : "update file",
                "delete" : "delete file",
            }}
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

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance.image.delete()
            
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset=Course.objects.all()

    def list(self, request, member_pk=None):
        queryset = Course.objects.filter(course_member=member_pk)
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, member_pk=None):
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    
    @action(detail=True,methods=['get'])
    def courseMember(self,request, pk=None,member_pk=None):
        if Course.objects.filter(pk=pk, course_member=member_pk).exists():
            queryset = Course.objects.get(pk=pk).course_member
            serializer = MemberSerializer(queryset,many=True)
            return Response(serializer.data)


    
class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def list(self, request, member_pk=None, course_pk=None):
        queryset = Lesson.objects.filter(course__course_member=member_pk, course=course_pk)
        serializer = LessonSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, member_pk=None,course_pk=None):
        queryset = Lesson.objects.filter(pk=pk,course__course_member=member_pk, course=course_pk)
        lesson = get_object_or_404(queryset, pk=pk)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)

class FileViewSet(viewsets.ViewSet,viewsets.GenericViewSet,DestroyModelMixin):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    parser_classes = (FormParser,MultiPartParser,JSONParser,)

    def list(self, request, member_pk=None, course_pk=None,lesson_pk=None):
        queryset = File.objects.filter(lesson__course__course_member=member_pk, lesson__course=course_pk,lesson=lesson_pk)
        serializer = FileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, member_pk=None,course_pk=None,lesson_pk=None):
        queryset = File.objects.filter(pk=pk,lesson__course__course_member=member_pk, lesson__course=course_pk,lesson=lesson_pk)
        file_upload = get_object_or_404(queryset, pk=pk)
        serializer = FileSerializer(file_upload)
        return Response(serializer.data)

    def create(self, request, member_pk=None,course_pk=None,lesson_pk=None):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance.file_upload.delete()
            
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)



