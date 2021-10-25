from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
# Create your views here.


class ApiStructure(APIView):
    def get(self, request):
        return Response({
            "note": "pk, member_pk, course_pk,... is a number",
            "": "api structure",
            "login": "login của bạn lương",
            "members":
            {
                "get": "return member list (will be disabled in future)",
                "post": "create a member (will be disabled in future)",
            },
            "members/pk":
            {
                "get": "returns the details of member whose id is pk",
                "put": "update member whose id is pko",
                "delete": "delete member whose id is pk",
            },
            "members/member_pk/courses":
            {
                "get": "return course list of member whose id is member_pk",
                "post": "create course for member whose id is member"
            },
            "members/member_pk/courses/pk":
            {
                "get": "returns the details of course",
                "put": "update course",
                "delete": "delete course",
            },
            "members/member_pk/courses/listMember": "return course member list",
            "members/member_pk/courses/course_pk/lesson":
            {
                "get": "return lesson list",
                "post": "create lesson"
            },
            "members/member_pk/courses/course_pk/lesson/pk":
            {
                "get": "returns the details of lesson",
                "put": "update lesson",
                "delete": "delete lesson",
            },
            "members/member_pk/courses/course_pk/lesson/lesson_pk/files":
            {
                "get": "return file list",
                "post": "create file"
            },
            "members/member_pk/courses/course_pk/lesson/lesson_pk/files/pk":
            {
                "get": "returns the details of file",
                "put": "update file",
                "delete": "delete file",
            }}
        )


class LoginApiView(APIView):
    def get(self, request):
        return Response({'Chua lam': True})


class MemberViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
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


class CourseViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

    def list(self, request, member_pk=None):
        queryset = Course.objects.filter(course_member=member_pk)
        if queryset.exists():
            serializer = CourseSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, pk=None, member_pk=None):
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exists():
            serializer = CourseSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, pk=None, member_pk=None):
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

    def update(self, request, member_pk=None, pk=None):
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exist():
            instance = queryset[0]
            serializer = CourseSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Resposne(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, member_pk=None, pk=None):
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exist():
            instance = queryset[0]
            instance.detele()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)

    @action(detail=True, methods=['get'])
    def listMember(self, request, pk=None, member_pk=None):
        queryset = Course.objects.filter(pk=pk, course_member=member_pk)
        if queryset.exists():
            serializer = MemberSerializer(queryset[0].course_member, many=True)
            return Response(serializer.data)


class LessonViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def list(self, request, member_pk=None, course_pk=None):
        queryset = Lesson.objects.filter(
            course__course_member=member_pk, course=course_pk)
        if queryset.exists():
            serializer = LessonSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, member_pk=None, course_pk=None, pk=None):
        queryset = Lesson.objects.filter(
            pk=pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            serializer = LessonSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, member_pk=None, course_pk=None):
        queryset = Course.objects.filter(pk=course_pk, course_member=member_pk)
        if queryset.exists():
            serializer = LessonSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.course = queryset[0]
            instance.save()
            return Response(serializer.data, status=201)
        return Response({'errors': 'Bad request'}, status=400)

    def update(self, request, member_pk=None, course_pk=None, pk=None):
        queryset = Lesson.objects.filter(
            pk=pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            serializer = LessonSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, member_pk=None, course_pk=None, pk=None):
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

    def list(self, request, member_pk=None, course_pk=None, lesson_pk=None):
        queryset = File.objects.filter(
            lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def retrieve(self, request, pk=None, member_pk=None, course_pk=None, lesson_pk=None):
        queryset = File.objects.filter(
            pk=pk, lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, member_pk=None, course_pk=None, lesson_pk=None):
        queryset = Lesson.objects.filter(
            pk=lesson_pk, course=course_pk, course__course_member=member_pk)
        if queryset.exists():
            serializer = FileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.lesson = queryset[0]
            instance.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, lesson_pk, member_pk=None, course_pk=None, pk=None):
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

    def destroy(self, request, lesson_pk, member_pk=None, course_pk=None, pk=None):
        queryset = File.objects.filter(
            pk=pk, lesson=lesson_pk, lesson__course=course_pk, lesson__course__course_member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)
