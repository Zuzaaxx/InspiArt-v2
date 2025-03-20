from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User
from .serializers import UserSerializer

# Create your views here.
@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)