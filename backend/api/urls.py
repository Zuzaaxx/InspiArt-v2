from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CategoriesViewSet, IdeaViewSet, UsersFavouritesViewSet, get_user, test_users

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoriesViewSet, basename='categories')
router.register(r'ideas', IdeaViewSet, basename='ideas')
router.register(r'favourites', UsersFavouritesViewSet, basename='favourites')


urlpatterns = [
    path('', include(router.urls)),
    path('users_test/<int:id>/', test_users, name='test-users'),
    path('users/<int:id>/', get_user, name='get_user'),
]
