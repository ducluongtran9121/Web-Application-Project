from rest_framework import serializers
from .models import *



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','mskh','name','description','created_by','course_lecturer']



class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id','name']
class CourseDetailSerializer(serializers.ModelSerializer):
    course_lesson=LessonSerializer(many=True,read_only=True)
    class Meta:
        model = Course
        fields = ['id','mskh','name','description','create_at','update_at','created_by','course_lecturer','course_lesson']
        read_only_fields = ['id','create_at','update_at']


    def update(self,instance,validated_data):
        #lessons_data = validated_data.pop('course_lesson',None)
        lecturers_data = validated_data.pop('course_lecturer',None)
        
        instance = super(CourseDetailSerializer,self).update(instance, validated_data)
        print(lecturers_data)
        for lecturer_data in lecturers_data:

            lecturer_qs = Member.objects.filter(id=lecturer_data.id)

            if lecturer_qs.exists():
                lecturer = lecturer_qs.first()
            else:
                lecturer = Member.objects.create(**lecturer_data)
            
            instance.course_lecturer.add(lecturer)

        return instance
