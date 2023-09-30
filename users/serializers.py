from django.contrib.auth.models import User
from rest_framework.relations import HyperlinkedRelatedField
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from directmessages.models import DirectMessageModel


class UserSerializer(HyperlinkedModelSerializer):
    # sender_messages = HyperlinkedRelatedField(view_name='directmessages-detail', many=True, read_only=True)
    # recipient_messages = HyperlinkedRelatedField(view_name='directmessages-detail', many=True,read_only=True)
    class Meta:
        model = User
        fields = ['username','password','email','id']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)