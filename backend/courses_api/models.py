from django.db import models

class Student(models.Model):
    mssv=models.CharField(max_length=50,unique=True)
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=254)
    image=models.ImageField()


    def __str__(self):
        return "{0} - {1}".format(self.name,self.mssv)

    class Meta:
        ordering = ['mssv']

class Lecturer(models.Model):
    msgv=models.CharField(max_length=50,unique=True)
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=254)
    image=models.ImageField()

    def __str__(self):
        return "{0} - {1}".format(self.name,self.msgv)

    class Meta:
        ordering = ['msgv']

class Course(models.Model):
    msmh = models.CharField(max_lenth=50,unique=True)
    name = models.CharField(max_lenth=500)
    description = models.TextField()
    course_member = models.ManyToManyField(Student,related_name="have_student")

    def __str__(self):
        return "{0} - {1}".format(self.name,self.msmh)
    

    class Meta:
        ordering = ['msmh']