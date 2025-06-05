from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import UserSerializer, CategoriesSerializer, IdeaSerializer, UsersFavouritesSerializer, UsersGallerySerializer
from .services import UserService
from .repositories import UserRepository
from .models import Categories, Idea, UsersFavourites, UsersGallery, User
from rest_framework.views import APIView
import random
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .tasks import send_welcome_email

@extend_schema(
    responses={
        200: UserSerializer,
        404: OpenApiResponse(description='User not found'),
    }
)
@api_view(['GET'])
def get_user(request, id):
    try:
        user = UserRepository.get_user_by_id(id)
        if not user:
            return Response({"error": "User not found", "status": 404}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "Internal server error", "status": 500}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def test_users(request, id):
    sample_data = {
        "id": 1,
        "name": "Jan Kowalski",
        "email": "jan@example.com"
    }
    return Response(sample_data)

@extend_schema(
    tags=['Users'],
    responses={
        200: UserSerializer(many=True),
    }
)
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer

    def get_queryset(self):
        return UserRepository.get_all_users()

    @extend_schema(
        request=UserSerializer,
        responses={
            201: UserSerializer,
            400: OpenApiResponse(description='Bad request'),
        }
    )
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_welcome_email.delay(user.email, user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    @extend_schema(
        responses={
            200: OpenApiResponse(description='Admin role granted'),
            404: OpenApiResponse(description='User not found'),
        }
    )
    @action(detail=True, methods=['post'], url_path='make-admin')
    def make_admin(self, request, pk=None):
        user = UserService.make_admin(pk)
        if user:
            return Response({'status': 'admin role granted'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not found', 'status': 404}, status=status.HTTP_404_NOT_FOUND)

    @extend_schema(
        responses={
            200: OpenApiResponse(description='Admin role removed'),
            404: OpenApiResponse(description='User not found'),
        }
    )
    @action(detail=True, methods=['post'], url_path='remove-admin')
    def remove_admin(self, request, pk=None):
        user = UserService.remove_admin(pk)
        if user:
            return Response({'status': 'admin role removed'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not found', 'status': 404}, status=status.HTTP_404_NOT_FOUND)

@extend_schema(
    tags=['Categories'],
    responses={
        200: CategoriesSerializer(many=True),
    }
)
class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    @extend_schema(
        responses={
            200: IdeaSerializer,
            404: OpenApiResponse(description='Category or ideas not found'),
        }
    )
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

@extend_schema(
    tags=['Ideas'],
    responses={
        200: IdeaSerializer,
        404: OpenApiResponse(description='No ideas found'),
    }
)
@api_view(['GET'])
def random_idea(request):
    ideas = Idea.objects.all()
    if not ideas.exists():
        return Response({"detail": "No ideas found."}, status=404)
    idea = random.choice(ideas)
    serializer = IdeaSerializer(idea)
    return Response(serializer.data)

@extend_schema(
    tags=['Ideas'],
    responses={
        200: IdeaSerializer(many=True),
        201: IdeaSerializer,
        403: OpenApiResponse(description='Forbidden'),
    }
)
class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

@extend_schema(
    tags=['Favourites'],
    responses={
        200: UsersFavouritesSerializer(many=True),
        401: OpenApiResponse(description='Unauthorized'),
        404: OpenApiResponse(description='Not found'),
    }
)
class UsersFavouritesViewSet(viewsets.ModelViewSet):
    serializer_class = UsersFavouritesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UsersFavourites.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, pk=None):
        try:
            favourite = UsersFavourites.objects.get(user=self.request.user, idea__id=pk)
            favourite.delete()
            return Response(status=204)
        except UsersFavourites.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

@extend_schema(
    tags=['Gallery'],
    responses={
        200: UsersGallerySerializer(many=True),
        401: OpenApiResponse(description='Unauthorized'),
        404: OpenApiResponse(description='Not found'),
    }
)
class UsersGalleryViewSet(viewsets.ModelViewSet):
    serializer_class = UsersGallerySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UsersGallery.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, pk=None):
        try:
            gallery_item = UsersGallery.objects.get(user=self.request.user, id=pk)
            gallery_item.delete()
            return Response(status=204)
        except UsersGallery.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

@extend_schema(
    tags=['User Profile'],
    responses={
        200: UserSerializer,
        400: OpenApiResponse(description='Bad request'),
    }
)
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
            "is_staff": user.is_staff,
        }
        return Response(data)

    elif request.method == 'PUT':
        user = request.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        return Response({"detail": "Profile updated successfully."})

@extend_schema(
    tags=['User Profile'],
    responses={
        200: OpenApiResponse(description='Password changed successfully'),
        400: OpenApiResponse(description='Bad request'),
    }
)
@api_view(['POST'])
def change_password(request):
    user = request.user
    new_password = request.data.get('new_password')
    if not new_password:
        return Response({"detail": "New password not provided."}, status=400)
    user.password = make_password(new_password)
    user.save()
    return Response({"detail": "Password changed successfully."})
