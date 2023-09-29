from django.urls import path
from . import views
urlpatterns = [
    path('listdm/', views.ListDirectMessageApiView.as_view()),
    path('createdm/',views.DetailDirectMessageApiView.as_view())

]