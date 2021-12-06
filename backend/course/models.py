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
