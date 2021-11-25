from django.db import models
from course.models import Lesson
from deadline.models import Deadline, DeadlineSubmit
# Create your models here.

# comment


class File(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='file_lesson', null=True, blank=True)
    deadline = models.ForeignKey(
        Deadline, on_delete=models.CASCADE, related_name='file_deadline_lesson', null=True, blank=True)
    deadlineSubmit = models.ForeignKey(
        DeadlineSubmit, on_delete=models.CASCADE, related_name='file_deadlineSubmit_lesson', null=True, blank=True)
    name = models.CharField(max_length=50)
    file_upload = models.FileField(upload_to="file/%Y/%m/%d/")
    in_folder = models.CharField(max_length=200, blank=True)

    def delete(self, using=None, keep_parents=False):
        self.file_upload.delete()
        super().delete()

    def __str__(self):
        if self.lesson == None:
            if self.deadline == None:
                return "%s - %s" % (self.name, self.deadlineSubmit)
            return "%s - %s" % (self.name, self.deadline)
        return "%s - %s" % (self.name, self.lesson)
