from django.urls import path
from .views import get_user, test_users
from . import views

urlpatterns = [
    path('users/<int:id>/', get_user, name='get_user'),
    path('users_test/<int:id>/', test_users, name='test-users'),
    path("", views.index, name="index"),
]