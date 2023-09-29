from django.urls import path

from users.views import ListCreateUserApiView

urlpatterns = [
    path('', ListCreateUserApiView.as_view()),
]