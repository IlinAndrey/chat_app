from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView

from users.serializers import UserSerializer


# Create your views here.


class ListCreateUserApiView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

