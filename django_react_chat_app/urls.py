from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from directmessages.views import DirectMessageViewSet
from users.views import UserViewSet
from . import views

router = DefaultRouter()

router.register(r'directmessages',DirectMessageViewSet, basename='directmessages')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include(router.urls)),
]

