from django.urls import path
from . import views
urlpatterns = [
    path('listdm/', views.ListDirectMessageApiView.as_view()),
    path('createdm/',views.CreateDirectMessageApiView.as_view()),
    path('dm-detail/<int:pk>/', views.DetailDirectMessageApiView.as_view(), name='directmessages-detail')

]