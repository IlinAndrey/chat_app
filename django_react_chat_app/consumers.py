import json

from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
from django.db.models import Q

from directmessages.models import DirectMessageModel
from directmessages.serializers import DirectMessageSerializer
from rest_framework.renderers import JSONRenderer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    directmessages_serializer_class = DirectMessageSerializer
    async def connect(self):
        self.sender = self.scope['user']
        self.recipient_id = self.scope['url_route']['kwargs']['recipient_id']
        print(self.sender.id)
        print(self.recipient_id)
        self.room_name = '_'.join(map(str,sorted([int(self.recipient_id), self.sender.id])))
        print(self.room_name)
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        messages = await sync_to_async(DirectMessageModel.objects.filter)(
                Q(sender=self.sender, recipient=self.recipient_id) |
                Q(sender=self.recipient_id, recipient=self.sender))
        await self.accept()
        serializer = self.directmessages_serializer_class(messages, many=True)
        # await sync_to_async(print)(messages)
        #
        # await sync_to_async(serializer.is_valid)()
        data = await sync_to_async(self.get_serializer_data)(serializer)

        await self.channel_layer.group_send(self.room_group_name,
                                            {'type': 'chat.message', 'message': data}
                                            )

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
        print('Отправил в сокет сообщение: ', message)
        if isinstance(message, str):
            await self.send(text_data=message)
        elif isinstance(message, bytes):
            await self.send(bytes_data=message)
        else:
            print('произошла фигня')
    @staticmethod
    def get_serializer_data(serializer):
        print(serializer.data)
        return JSONRenderer().render(serializer.data)
