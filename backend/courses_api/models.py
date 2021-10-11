from django.db import models

class Student(models.Models):
    MSSV=models.CharField(max_length=50,unique=True)
    Name=models.CharField(max_length=200)
    email=models.EmailField(max_length=254)
    phone = models.PhoneNumberField()
    

    def __str__(self):
        return "{0} {1}".format(self.Name,self.MSSV)