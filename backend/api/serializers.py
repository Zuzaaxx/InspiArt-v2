from rest_framework import serializers
from .models import User, Categories, Idea, UsersFavourites, UsersGallery

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
        }

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'category_name']

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ['id', 'category', 'picture', 'alternative_text']

class UsersFavouritesSerializer(serializers.ModelSerializer):
    idea_id = serializers.PrimaryKeyRelatedField(source='idea', queryset=Idea.objects.all())

    class Meta:
        model = UsersFavourites
        fields = ['id', 'idea_id']

class UsersGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersGallery
        fields = ['id', 'idea', 'title', 'description', 'date']
