from django.contrib.auth.models import AbstractUser
from django.db import models

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
    picture = models.ImageField(upload_to='ideas', null=True, blank=True)
    alternative_text = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.picture.name


class UsersFavourites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'idea')

class UsersGallery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField()

    def __str__(self):
        return self.title
