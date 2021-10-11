from django.db import models

class Student(models.Model):
    mssv=models.CharField(max_length=50,unique=True)
    name=models.CharField(max_length=200)
    email=models.EmailField(max_length=254)
    image=models.ImageField()


    def __str__(self):
        return "{0} {1}".format(self.name,self.mssv)