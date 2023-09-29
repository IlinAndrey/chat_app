from django.contrib.auth.models import User
from django.db import models
from django.db.models import DO_NOTHING

from directmessages.managers import DirectMessageManager


# Create your models here.

class DirectMessageModel(models.Model):
    objects = DirectMessageManager()
    sender = models.OneToOneField(User, on_delete=DO_NOTHING, related_name='Отправитель')
    text = models.TextField()
    recipient = models.OneToOneField(User, on_delete=DO_NOTHING, related_name='Получатель')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
