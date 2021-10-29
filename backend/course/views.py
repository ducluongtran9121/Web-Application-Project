from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from account.serializers import MemberSerializer

# Create your views here.


class CourseApiStructure(APIView):
    def get(self, request):
        return Response({
            "courses/":
            {
                "get": "return course list of member",
                "post": "create course for member"
            },
            "courses/pk/":
            {
                "get": "returns the details of course",
                "put": "update course",
                "delete": "delete course",
            },
            "courses/pk/listMember/": "return course member list",
            "courses/course_pk/lesson/":
            {
                "get": "return lesson list",
                "post": "create lesson"
            },
            "courses/course_pk/lesson/pk/":
            {
                "get": "returns the details of lesson",
                "put": "update lesson",
                "delete": "delete lesson",
            },
            "courses/course_pk/lesson/lesson_pk/files/":
            {
                "get": "return file list",
                "post": "create file"
            },
            "courses/course_pk/lesson/lesson_pk/files/pk/":
            {
                "get": "returns the details of file",
                "put": "update file",
                "delete": "delete file",
            }}
        )


class CourseViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        member_pk=request.user.id
        queryset = Course.objects.filter(course_member=member_pk)
        if queryset.exists():
            serializer = CourseSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, pk=None):
        member_pk=request.user.id
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exists():
            serializer = CourseSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, pk=None):
        member_pk=request.user.id
        queryset = Member.objects.filter(pk=member_pk)
        if queryset.exists():
            serializer = CourseSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.created_by = queryset[0]
            instance.course_lecturer.add(queryset[0])
            instance.save()
            return Response(serializer.data, status=201)
        return Response({'errors': 'Bad request'}, status=400)

    def update(self, request, pk=None):
        member_pk=request.user.id
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exist():
            instance = queryset[0]
            serializer = CourseSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, pk=None):
        member_pk=request.user.id
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exist():
            instance = queryset[0]
            instance.detele()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)

    @action(detail=True, methods=['get'])
    def listMember(self, request, pk=None):
        member_pk=request.user.id
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exists():
            serializer = MemberSerializer(queryset[0].course_member, many=True)
            return Response(serializer.data)


class LessonViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request, course_pk=None):
        member_pk=request.user.id
        queryset = Lesson.objects.filter(
            course__course_member=member_pk, course=course_pk)
        if queryset.exists():
            serializer = LessonSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, course_pk=None, pk=None):
        member_pk=request.user.id
        queryset = Lesson.objects.filter(
            pk=pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            serializer = LessonSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, course_pk=None):
        member_pk=request.user.id
        queryset = Course.objects.filter(pk=course_pk, course_member=member_pk)
        if queryset.exists():
            serializer = LessonSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.course = queryset[0]
            instance.save()
            return Response(serializer.data, status=201)
        return Response({'errors': 'Bad request'}, status=400)

    def update(self, request, course_pk=None, pk=None):
        member_pk=request.user.id
        queryset = Lesson.objects.filter(
            pk=pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            serializer = LessonSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, course_pk=None, pk=None):
        member_pk=request.user.id
        queryset = Lesson.objects.filter(
            pk=pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)


class FileViewSet(viewsets.ViewSet, viewsets.GenericViewSet, mixins.DestroyModelMixin):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    parser_classes = (FormParser, MultiPartParser, JSONParser,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, course_pk=None, lesson_pk=None):
        member_pk=request.user.id
        queryset = File.objects.filter(
            lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, pk=None, course_pk=None, lesson_pk=None):
        member_pk=request.user.id
        queryset = File.objects.filter(
            pk=pk, lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, course_pk=None, lesson_pk=None):
        member_pk=request.user.id
        queryset = Lesson.objects.filter(
            pk=lesson_pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.lesson = queryset[0]
            instance.save()
            return Response(serializer.data, status=201)
        return Response(serializers.errors, status=400)

    def update(self, request, lesson_pk, course_pk=None, pk=None):
        member_pk=request.user.id
        queryset = File.objects.filter(
            pk=pk, lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            serializer = FileSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            instance.file_upload.delete()
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, lesson_pk, course_pk=None, pk=None):
        member_pk=request.user.id
        queryset = File.objects.filter(
            pk=pk, lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)
