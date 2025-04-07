from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    def __str__(self):
        return self.username
    
class Categories(models.Model):
    category_name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.category_name

class Idea(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to='ideas')
    alternative_text = models.TextField()

    def __str__(self):
        return self.picture.name