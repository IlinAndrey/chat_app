from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email','id']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)