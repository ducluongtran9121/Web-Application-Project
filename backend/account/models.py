from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models

# Create your models here.
class MemberManager(BaseUserManager):
    
    def create_user(self, code, email, name, password=None):
        
        if not email:
            raise ValueError("Users must have an email")
        
        email = self.normalize_email(email)
        user  = self.model(code = code,email=email, name=name)
        
        user.set_password(password)
        user.save(using=self._db)
        
        return user
     
    def create_superuser(self, code, email, name, password):
        
        user = self.create_user(code, email, name, password)
        
        user.is_superuser = True
        user.is_staff = True
        
        user.save(using=self._db)
        
        return user 
        
class Member(AbstractBaseUser, PermissionsMixin):
    
    code = models.CharField(max_length=20, unique=True, blank=False, null=False)
    name = models.CharField(max_length=200)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default='M')
    email = models.EmailField(max_length=255, unique=True)
    image = models.ImageField(upload_to="img/",null=True)
    is_lecturer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = MemberManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['code', 'name']
    
    def __str__(self):
        return "%s - %s" % (self.name, self.code)

    def delete(self, using=None, keep_parents=False):
        self.image.storage.delete(self.image.name)
        super().delete()

    class Meta:
        ordering = ['code']

