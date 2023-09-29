from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/user', include('users.urls')),
    path('api/v1/', include('directmessages.urls')),
]
