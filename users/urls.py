from django.urls import path

from directmessages.views import DetailDirectMessageApiView
from users.views import ListCreateUserApiView

urlpatterns = [
    path('', ListCreateUserApiView.as_view()),
    #path('detail/', DetailDirectMessageApiView.as_view(), name='user-detail' )
]