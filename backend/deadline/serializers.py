from rest_framework import serializers
from .models import *
from resource.models import File
from account.models import Member
from resource.serializers import FileSerializer


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'code', 'name', 'email', 'image']


class DeadlineStudentStatusSerializer(serializers.ModelSerializer):
    file_deadlineSubmit_lesson = FileSerializer(read_only=True, many=True)
    member = StudentSerializer(read_only=True)

    class Meta:
        model = DeadlineSubmit
        fields = ['id', 'is_finished', 'finish_at', 'member',
                  'file_deadlineSubmit_lesson']
        read_only_fields = ['is_finished', 'finish_at']


class DeadlineStatusSerializer(serializers.ModelSerializer):
    file_deadlineSubmit_lesson = FileSerializer(read_only=True, many=True)

    class Meta:
        model = DeadlineSubmit
        fields = ['id', 'is_finished', 'finish_at',
                  'file_deadlineSubmit_lesson', 'deadline']
        read_only_fields = ['is_finished', 'finish_at']
        depth = 1


class DeadlineSerializer(serializers.ModelSerializer):
    file_deadline_lesson = FileSerializer(read_only=True, many=True)

    class Meta:
        model = Deadline
        fields = '__all__'
        read_only_fields = ['create_by', 'lesson']
