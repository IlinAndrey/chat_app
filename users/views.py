from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveAPIView

from users.serializers import UserSerializer


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return User.objects.all()
        else:
            return User.objects.filter(pk=self.request.user.pk)

# class ListCreateUserApiView(ListCreateAPIView):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#
#
# class DetailUserApiView(RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
