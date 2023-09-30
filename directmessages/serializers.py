from django.contrib.auth.models import User
from rest_framework.fields import DateTimeField
from rest_framework.relations import HyperlinkedRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from directmessages.models import DirectMessageModel


class DirectMessageSerializer(HyperlinkedModelSerializer):
    sender = HyperlinkedRelatedField(view_name='users-detail', queryset=User.objects.all())
    recipient = HyperlinkedRelatedField(view_name='users-detail', queryset=User.objects.all())
    created = DateTimeField(read_only=True)
    class Meta:
        model = DirectMessageModel
        fields = ['text', 'sender','recipient','created']
