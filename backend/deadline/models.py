from django.db import models
from course.models import Lesson
from account.models import Member

# Create your models here.


class Deadline(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='deadline_lesson', null=True, blank=True)

    name = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    create_by = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name='lecturer_deadline', null=True, blank=True)
    begin = models.DateTimeField()
    end = models.DateTimeField()

    def __str__(self):
        return "%s - %s" % (self.name, self.lesson)

    class Meta:
        ordering = ['end']


class DeadlineSubmit(models.Model):
    member = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name='member_deadline', null=True, blank=True)
    deadline = models.ForeignKey(
        Deadline, on_delete=models.CASCADE, related_name="deadline_submit", null=True, blank=True)
    is_finished = models.BooleanField(default=False)
    finish_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "%s - %s" % (self.member, self.deadline)

    class Meta:
        ordering = ['is_finished', 'finish_at']
