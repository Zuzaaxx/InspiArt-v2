from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action
from rest_framework import viewsets,status
from .models import User, Categories, Idea, UsersFavourites, UsersGallery
from .serializers import UserSerializer, CategoriesSerializer, IdeaSerializer, UsersFavouritesSerializer, UsersGallerySerializer
from django.http import HttpResponse
from django.http import JsonResponse
import random
from django.contrib.auth.hashers import make_password


@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# test
def test_users(request, id):
    sample_data = {
        "id": 1,
        "name": "Jan Kowalski",
        "email": "jan@example.com"
    }
    return JsonResponse(sample_data)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    @action(detail=True, methods=['get'], url_path='random_idea')
    def random_idea(self, request, pk=None):
        try:
            category = self.get_object()
            ideas = Idea.objects.filter(category=category)
            if not ideas.exists():
                return Response({"detail": "No ideas found for this category."}, status=404)
            idea = random.choice(ideas)
            serializer = IdeaSerializer(idea)
            return Response(serializer.data)
        except Categories.DoesNotExist:
            return Response({"detail": "Category not found."}, status=404)

class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer

class UsersFavouritesViewSet(viewsets.ModelViewSet):
    serializer_class = UsersFavouritesSerializer

    def get_queryset(self):
        return UsersFavourites.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def destroy(self, request, pk=None):
        try:
            favourite = UsersFavourites.objects.get(idea__id=pk)
            favourite.delete()
            return Response(status=204)
        except UsersFavourites.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

class UsersGalleryViewSet(viewsets.ModelViewSet):
    serializer_class = UsersGallerySerializer

    def get_queryset(self):
        return UsersGallery.objects.all()

    def perform_create(self, serializer):
        serializer.save()

@api_view(['GET', 'PUT'])
def user_profile(request):
    if request.method == 'GET':
        user = request.user
        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_picture": user.profile_picture.url if user.profile_picture else None,
        }
        return Response(data)

    elif request.method == 'PUT':
        user = request.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        return Response({"detail": "Profile updated successfully."})

@api_view(['POST'])
def change_password(request):
    user = request.user
    new_password = request.data.get('new_password')
    if not new_password:
        return Response({"detail": "New password not provided."}, status=400)
    user.password = make_password(new_password)
    user.save()
    return Response({"detail": "Password changed successfully."})
