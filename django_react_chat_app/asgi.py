"""
ASGI config for django_react_chat_app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

from django_react_chat_app.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_react_chat_app.settings')


django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        'http':django_asgi_app,
        'websocket':
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns)
        ),

    }

)
