from rest_framework.serializers import  ModelSerializer

from directmessages.models import DirectMessageModel


class DirectMessageSerializer(ModelSerializer):
    class Meta:
        model = DirectMessageModel
        fields = ['text', 'recipient']
