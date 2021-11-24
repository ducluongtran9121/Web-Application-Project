from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response
from .serializers import DeadlineSerializer, DeadlineSubmitSerializer
from .models import *
from course.models import Lesson
from account.models import Member
# Create your views here.


class DeadlineApiStructure(APIView):
    def get(self, request):
        return Response({
            "myDeadline/": "List all deadline of current student",
            "lesson_pk/lectureDeadline/": "List/Create deadline created by current lecturer in the lesson with id lesson_pk",
            "lesson_pk/lectureDeadline/pk/": "Retrieve/Update/Destroy deadline with id pk created by current lecturer in the lesson with id lesson_pk",
            "lesson_pk/studentDeadline/": "List deadline status of current student in the lesson with id lesson_pk",
            "lesson_pk/studentDeadline/pk/": "Retrieve deadline status with id pk of current student in the lesson with id lesson_pk"
        })


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


class StudentDeadlineViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = DeadlineSubmitSerializer
    queryset = DeadlineSubmit.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request, lesson_pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(
            member=member_pk, deadline__lesson=lesson_pk)
        serializer = DeadlineSubmitSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, lesson_pk=None, pk=None):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(
            id=pk, member=member_pk, deadline__lesson=lesson_pk)
        if queryset.exists():
            serializer = DeadlineSubmitSerializer(queryset[0])
            return Response(serializer.data)
        return Response({'errors': 'Objects not found'}, status=404)


class StudentDeadlineStatusApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if request.user.is_lecturer:
            return Response({'error': 'You are not a student'}, status=403)

        member_pk = request.user.id
        queryset = DeadlineSubmit.objects.filter(member=member_pk)
        serializer = DeadlineSubmitSerializer(queryset, many=True)
        return Response(serializer.data)
