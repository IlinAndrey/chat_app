from django.db.models import Q
from django.shortcuts import render
from rest_framework import generics, permissions, mixins, viewsets

from directmessages.models import DirectMessageModel
from directmessages.serializers import DirectMessageSerializer


# Create your views here.
class DirectMessageViewSet(viewsets.ModelViewSet):
    serializer_class = DirectMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        recipient = self.request.data.get('recipient', None)
        if recipient:
            queryset = DirectMessageModel.objects.filter(
                Q(sender=self.request.user, recipient=recipient) |
                Q(sender=recipient, recipient=self.request.user))
        else:
            queryset = DirectMessageModel.objects.filter(sender=self.request.user)
        return queryset

    def perform_create(self, serializer):
        sender = self.request.user
        print(self.request.data)
        serializer.save(sender=sender)

# class ListDirectMessageApiView(generics.ListAPIView):
#     serializer_class = DirectMessageSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def get_queryset(self):
#         recipient = self.request.data.get('recipient', None)
#         if recipient:
#             queryset = DirectMessageModel.objects.filter(
#                 Q(sender=self.request.user, recipient=recipient) |
#                 Q(sender=recipient, recipient=self.request.user))
#         else:
#             queryset = DirectMessageModel.objects.filter(sender=self.request.user)
#         return queryset
#
#
# class DetailDirectMessageApiView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = DirectMessageModel.objects.all()
#     serializer_class = DirectMessageSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#
# class CreateDirectMessageApiView(generics.CreateAPIView):
#     queryset = DirectMessageModel.objects.all()
#     serializer_class = DirectMessageSerializer
#
#     def perform_create(self, serializer):
#         sender = self.request.user
#         print(self.request.data)
#         serializer.save(sender=sender)