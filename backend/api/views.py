from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from .serializers import UserSerializer
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
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

def index(request):
    return HttpResponse("Hello, world. You're at the api index.")

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
