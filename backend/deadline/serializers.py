from rest_framework import serializers
from .models import *
from resource.serializers import FileSerializer


class DeadlineSubmitSerializer(serializers.ModelSerializer):
    file_deadlineSubmit_lesson = FileSerializer(read_only=True, many=True)

    class Meta:
        model = DeadlineSubmit
        fields = ['id', 'file_deadlineSubmit_lesson',
                  'is_finished', 'finish_at', 'deadline']
        depth = 1


class DeadlineSerializer(serializers.ModelSerializer):
    file_deadline_lesson = FileSerializer(read_only=True, many=True)

    class Meta:
        model = Deadline
        fields = '__all__'
