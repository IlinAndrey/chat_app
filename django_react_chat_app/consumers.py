import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        print(text_data)
        print(bytes_data)
        await self.channel_layer.group_send(self.room_group_name,
                                            {'type': 'chat.message', 'message': text_data}
                                            )
        # self.send(text_data=json.dumps({'message': text_data}))

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({'message': message}))
