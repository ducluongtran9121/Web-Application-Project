from rest_framework import serializers
from .models import *



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','mskh','name','description']

class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        depth=1
