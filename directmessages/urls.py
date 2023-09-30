from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

# router = SimpleRouter()
#
# router.register(r'directmessages',views.DirectMessageViewSet, basename='directmessages')
#
# urlpatterns = [
#     path('', include(router.urls)),
#     # path('list/', views.ListDirectMessageApiView.as_view()),
#     # path('create/',views.CreateDirectMessageApiView.as_view()),
#     # path('<int:pk>/', views.DetailDirectMessageApiView.as_view(), name='directmessages-detail')
#
# ]