from django.db import models
from datetime import datetime



class Member(models.Model):
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    image = models.ImageField(upload_to="img/",null=True)
    is_lecturer = models.BooleanField(default=False)

    def __str__(self):
        return "{0} - {1}".format(self.name,self.code)

    class Meta:
        ordering = ['code']

class Course(models.Model):
    mskh = models.CharField(max_length=50)
    name = models.CharField(max_length=500)
    description = models.TextField()
    course_member = models.ManyToManyField(Member,related_name="member_course")
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Member,related_name="created_course", on_delete=models.SET_NULL,null=True)
    course_lecturer= models.ManyToManyField(Member,related_name="lecturer_course")
    def __str__(self):
        return "{0} - {1}".format(self.name,self.mskh)
    

    class Meta:
        ordering = ['mskh']

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name='course_lesson')
    name = models.CharField(max_length=50)
    create_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
 
class File(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE,related_name='file_lesson')
    name = models.CharField(max_length=50)
    file_upload = models.FileField(upload_to="file/",null=True)
    in_folder = models.CharField(max_length=200,blank=True)

    def __str__(self):
        return self.name
    

# class Image(models.Model):
#     lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE,related_name='image')
#     name = models.CharField(max_length=50)
#     image_upload = models.FileField(upload_to=upload_to,null=True)
#     in_folder = models.CharField(max_length=200,blank=True)
