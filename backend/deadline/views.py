from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from .models import *
from course.models import Lesson, Course
from account.models import Member
from resource.models import File
from .serializers import *
from resource.serializers import FileSerializer
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from datetime import datetime
from django.utils import timezone
from rest_framework.decorators import action
# Create your views here.


class DeadlineApiStructure(APIView):
    def get(self, request):
        return Response({
            "myDeadlines/": "List all deadline of current student",
            "lesson_pk/lectureDeadlines/": "List/Create deadline created by current lecturer in the lesson with id lesson_pk",
            "lesson_pk/lectureDeadlines/pk/": "Retrieve/Update/Destroy deadline with id pk created by current lecturer in the lesson with id lesson_pk",
            "lesson_pk/lectureDeadlines/pk/listStudentDeadlineStatus/": "list all student deadline status in deadline with id pk",
            "lesson_pk/lectureDeadlines/deadline_pk/files": "List/Create deadline file in deadline with id deadline_pk",
            "lesson_pk/lectureDeadlines/deadline_pk/files/pk/": "Retrieve/Update/Destroy deadline file with id pk in deadline with id deadline_pk",
            "lesson_pk/studentDeadlines/": "List deadline status of current student in the lesson with id lesson_pk",
            "lesson_pk/studentDeadlines/pk/": "Retrieve deadline status with id pk of current student in the lesson with id lesson_pk",
            "lesson_pk/studentDeadlines/pk/submit/": "update finish status to True",
            "lesson_pk/studentDeadlines/pk/unsubmit/": "update finish status to False and delete all deadline file already submit",
            "lesson_pk/studentDeadlines/deadlineSubmit_pk/files": "List/Create deadline submit file (not update finish status, Create will update finish time)",
            "lesson_pk/studentDeadlines/eadlineSubmit_pk/files/pk/": "Retrieve/Update/Destroy deadline submit file with id pk (not update finish status, Update and Destroy will update finish time)"
        })


def createDeadlineSubmitForCourseStudent(instance):
    memberList = instance.lesson.course.course_member
    for member in memberList.filter(is_lecturer=False):
        deadline = DeadlineSubmit()
        deadline.member = member
        deadline.deadline = instance
        deadline.save()


class LecturerDeadlineViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = DeadlineSerializer
    queryset = Deadline.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request, lesson_pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Deadline.objects.filter(
            lesson=lesson_pk, create_by=member_pk)
        serializer = DeadlineSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, lesson_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Deadline.objects.filter(
            pk=pk, lesson=lesson_pk, create_by=member_pk)
        if queryset.exists():
            serializer = DeadlineSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, lesson_pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Lesson.objects.filter(id=lesson_pk)
        if queryset.exists():
            serializer = DeadlineSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.lesson = queryset[0]
            instance.create_by = Member.objects.get(id=member_pk)
            instance.save()
            createDeadlineSubmitForCourseStudent(instance)
            return Response(serializer.data, status=201)
        return Response({'errors': 'Bad request'}, status=400)

    def update(self, request, lesson_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Deadline.objects.filter(
            pk=pk, lesson=lesson_pk)
        if queryset.exists():
            instance = queryset[0]
            serializer = DeadlineSerializer(
                instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, lesson_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Deadline.objects.filter(
            pk=pk, lesson=lesson_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)

    @action(detail=True, methods=['get'])
    def listStudentDeadlineStatus(self, request, lesson_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)
        queryset = DeadlineSubmit.objects.filter(deadline=pk)
        serializer = DeadlineStudentStatusSerializer(queryset, many=True)
        return Response(serializer.data)


class StudentDeadlineViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = DeadlineStatusSerializer
    queryset = DeadlineSubmit.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request, lesson_pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(
            member=member_pk, deadline__lesson=lesson_pk)
        serializer = DeadlineStatusSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, lesson_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(
            id=pk, member=member_pk, deadline__lesson=lesson_pk)
        if queryset.exists():
            serializer = DeadlineStatusSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    @action(detail=True, methods=['put'])
    def submit(self, request, lesson_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(pk=pk, member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.is_finished = True
            instance.finish_at = timezone.now()
            instance.save()
            serializer = DeadlineStatusSerializer(instance)
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=400)

    @action(detail=True, methods=['put'])
    def unsubmit(self, request, lesson_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(pk=pk, member=member_pk)
        if queryset.exists():
            instance = queryset[0]
            instance.is_finished = False
            instance.finish_at = None
            instance.file_deadlineSubmit_lesson.all().delete()
            instance.save()
            serializer = DeadlineStatusSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=400)


class StudentDeadlineStatusApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(member=member_pk)
        serializer = DeadlineStatusSerializer(queryset, many=True)
        return Response(serializer.data)


class DeadlineSubmitFileViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    parser_classes = (FormParser, MultiPartParser, JSONParser,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, lesson_pk=None, deadlineSubmit_pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(deadlineSubmit=deadlineSubmit_pk)
        serializer = FileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, lesson_pk=None, deadlineSubmit_pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(pk=pk, deadlineSubmit=deadlineSubmit_pk)

        if queryset.exists():
            serializer = FileSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, lesson_pk=None, deadlineSubmit_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(
            pk=deadlineSubmit_pk, member=member_pk)

        if queryset.exists():
            serializer = FileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.deadlineSubmit = queryset[0]
            instance.deadlineSubmit.finish_at = timezone.now()
            instance.deadlineSubmit.save()
            instance.save()
            return Response(serializer.data, status=201)
        return Response(serializers.errors, status=400)

    def update(self, request, lesson_pk=None, deadlineSubmit_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(pk=pk, deadlineSubmit=deadlineSubmit_pk)

        if queryset.exists():
            instance = queryset[0]
            serializer = FileSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            instance.file_upload.delete()
            instance.deadlineSubmit.finish_at = timezone.now()
            instance.deadlineSubmit.save()
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, lesson_pk=None, deadlineSubmit_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(
            pk=pk, deadlineSubmit=deadlineSubmit_pk)

        if queryset.exists():
            instance = queryset[0]
            instance.deadlineSubmit.finish_at = timezone.now()
            instance.deadlineSubmit.save()
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)


class DeadlineFileViewSet(viewsets.ViewSet, viewsets.GenericViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    parser_classes = (FormParser, MultiPartParser, JSONParser,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, lesson_pk=None, deadline_pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(deadline=deadline_pk)
        serializer = FileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, lesson_pk=None, deadline_pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(pk=pk, deadline=deadline_pk)

        if queryset.exists():
            serializer = FileSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)

    def create(self, request, lesson_pk=None, deadline_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = Deadline.objects.filter(
            pk=deadline_pk, create_by=member_pk)

        if queryset.exists():
            serializer = FileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            instance.deadline = queryset[0]
            instance.save()
            return Response(serializer.data, status=201)
        return Response(serializers.errors, status=400)

    def update(self, request, lesson_pk=None, deadline_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(pk=pk, deadline=deadline_pk)

        if queryset.exists():
            instance = queryset[0]
            serializer = FileSerializer(instance=instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            instance.file_upload.delete()
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': 'Bad request'}, status=400)

    def destroy(self, request, lesson_pk=None, deadline_pk=None, pk=None):
        if not request.user.is_lecturer:
            return Response({'error': 'You are not a lecturer'}, status=403)

        member_pk = request.user.id
        queryset = File.objects.filter(
            pk=pk, deadline=deadline_pk)

        if queryset.exists():
            instance = queryset[0]
            instance.delete()
            return Response(status=204)
        return Response({'errors': 'Bad request'}, status=400)
