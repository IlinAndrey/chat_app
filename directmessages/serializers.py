from django.contrib.auth.models import User
from rest_framework.fields import DateTimeField

from rest_framework.serializers import ModelSerializer

from directmessages.models import DirectMessageModel


class DirectMessageSerializer(ModelSerializer):
    created = DateTimeField(read_only=True)
    class Meta:
        model = DirectMessageModel
        fields = ['text', 'sender','recipient','created','id']
