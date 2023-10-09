import json

from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer

from directmessages.models import DirectMessageModel
from directmessages.serializers import DirectMessageSerializer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    directmessages_serializer_class = DirectMessageSerializer
    async def connect(self):
        self.sender = self.scope['user']
        self.room_name = '_'.join(sorted([(self.scope['url_route']['kwargs']['recipient_id']), str(self.sender.id)]))
        print(self.room_name)
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):

        if not self.sender.is_anonymous and self.sender.is_authenticated :
            data = json.loads(text_data)
            serializer = self.directmessages_serializer_class(data = data)
            if await sync_to_async(serializer.is_valid)():

                await sync_to_async(serializer.save)(sender=self.sender)
                print(serializer)
        else:
            data = {'text':'U are not authenticated, error'}
        print(data)
        print(bytes_data)

        await self.channel_layer.group_send(self.room_group_name,
                                            {'type': 'chat.message', 'message': json.dumps(data)}
                                            )
        # self.send(text_data=json.dumps({'message': text_data}))

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=message)
