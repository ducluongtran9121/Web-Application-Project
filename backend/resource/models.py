from django.db import models
from course.models import Lesson
# Create your models here.


class File(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name='file_lesson', null=True)
    name = models.CharField(max_length=50)
    file_upload = models.FileField(upload_to="file/%Y/%m/%d/")
    in_folder = models.CharField(max_length=200, blank=True)

    def delete(self, using=None, keep_parents=False):
        self.file_upload.delete()
        super().delete()

    def __str__(self):
        return "%s - %s" % (self.name, self.lesson)
