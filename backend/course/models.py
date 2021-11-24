from django.db import models
from datetime import datetime
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from account.models import Member


class Course(models.Model):
    mskh = models.CharField(max_length=50)
    name = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    course_member = models.ManyToManyField(
        Member, related_name="member_course")
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        Member, related_name="created_course", on_delete=models.SET_NULL, null=True, blank=True)
    course_lecturer = models.ManyToManyField(
        Member, related_name="lecturer_course")

    def __str__(self):
        return "%s - %s" % (self.name, self.mskh)

    class Meta:
        ordering = ['mskh']


class Lesson(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='course_lesson', null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s - %s" % (self.name, self.course.mskh)


# class File(models.Model):
#     lesson = models.ForeignKey(
#         Lesson, on_delete=models.CASCADE, related_name='file_lessons', null=True)
#     name = models.CharField(max_length=50)
#     file_upload = models.FileField(upload_to="file/%Y/%m/%d/")
#     in_folder = models.CharField(max_length=200, blank=True)

#     def delete(self, using=None, keep_parents=False):
#         self.file_upload.delete()
#         super().delete()

#     def __str__(self):
#         return "%s - %s" % (self.name, self.lesson)


# class Image(models.Model):
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE,related_name='image')
#     name = models.CharField(max_length=50)
#     image_upload = models.FileField(upload_to=upload_to,null=True)
#     in_folder = models.CharField(max_length=200,blank=True)
