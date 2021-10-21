from rest_framework import serializers
from .models import *


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id','name','email','image']
class CourseSerializer(serializers.ModelSerializer):
    course_lecturer = LectureSerializer(many=True,read_only=True)
    created_by = LectureSerializer(read_only=True)
    class Meta:
        model = Course
        fields = ['id','mskh','name','description','created_by','course_lecturer']
        read_only_fields = ['id']


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
class LessonSerializer(serializers.ModelSerializer):
    file_lesson = FileSerializer(many=True,read_only=True)
    class Meta:
        model = Lesson
        fields = '__all__'

# class CourseDetailSerializer(serializers.ModelSerializer):
#     course_lesson=LessonSerializer(many=True,read_only=True)
#     class Meta:
#         model = Course
#         fields = ['id','mskh','name','description','create_at','update_at','created_by','course_lecturer','course_lesson']
#         read_only_fields = ['id','create_at','update_at']
#         extra_kwargs = {
#             'course_lecturer':{'validators':[]}
#         }


#     def update(self,instance,validated_data):
#         #lessons_data = validated_data.pop('course_lesson',None)
#         lecturers_data = validated_data.pop('course_lecturer',None)
        
#         instance = super(CourseDetailSerializer,self).update(instance, validated_data)

#         for lecturer_data in lecturers_data:

#             lecturer_qs = Member.objects.filter(id=lecturer_data.id)

#             if lecturer_qs.exists():
#                 lecturer = lecturer_qs.first()
#             else:
#                 lecturer = Member.objects.create(**lecturer_data)
            
#             instance.course_lecturer.add(lecturer)

#         return instance
