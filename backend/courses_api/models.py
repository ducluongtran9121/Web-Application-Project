from django.db import models


class Member(models.Model):
    code = models.CharField(max_length=50,unique=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    image = models.ImageField()
    is_lecturer = models.BooleanField(default=False)

    def __str__(self):
        return "{0} - {1}".format(self.name,self.code)

    class Meta:
        ordering = ['code']

class Course(models.Model):
    mskh = models.CharField(max_length=50,unique=True)
    name = models.CharField(max_length=500)
    description = models.TextField()
    course_member = models.ManyToManyField(Member,related_name="have_member")
    created_by = models.ForeignKey(Member, on_delete=models.CASCADE,null=False)

    def __str__(self):
        return "{0} - {1}".format(self.name,self.mskh)
    

    class Meta:
        ordering = ['mskh']