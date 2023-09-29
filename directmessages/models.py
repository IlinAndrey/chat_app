from django.contrib.auth.models import User
from django.db import models
from django.db.models import DO_NOTHING

from directmessages.managers import DirectMessageManager


# Create your models here.

class DirectMessageModel(models.Model):
    objects = DirectMessageManager()
    sender = models.ForeignKey(User, on_delete=DO_NOTHING, related_name='sender_messages')
    text = models.TextField()
    recipient = models.ForeignKey(User, on_delete=DO_NOTHING, related_name='recipient_messages')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
