import React, { Component, useEffect, useState } from 'react';
import SideBar from './SideBar'
import InputBar from './InputBar'
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from 'js-cookie';
import axios from 'axios';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogSelected, setIsDialogSelected] = useState(false);

  const [allMessages, setAllMessages] = useState([]);

  const csrftoken = Cookies.get('csrftoken');
  const sessionid = Cookies.get('sessionid');

  const chatWebSocket = useWebSocket(`ws://127.0.0.1:8000/ws/chat/${selectedUserId}/`, {
    headers: {
      ['csrftoken']: csrftoken,
      ['sessionid']: sessionid,
    },
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    onMessage: (messageEvent) => {
      const receivedMessage = JSON.parse(messageEvent.data);
      console.log('Получено сообщение от сервера:', receivedMessage.message);
  
      if (Array.isArray(receivedMessage.message)) {
        const newWebSocketMessages = receivedMessage.message.map(message => ({
          text: message.text,
        }));
        setMessages(prevMessages => [...prevMessages, ...newWebSocketMessages]);
      } else {
        setMessages(prevMessages => [...prevMessages, { text: receivedMessage.message }]);
      }
    },
  });
  const { readyState, sendJsonMessage } = chatWebSocket;

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  const handleSendMessage = () => {
    sendJsonMessage({ message });
    setMessage('');
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setRecipient(userId);
    setIsDialogSelected(true);
  };

  useEffect(() => {
    if (selectedUserId) {
      axios.get(`/api/v1/directmessages/?recipient=${selectedUserId}`)
        .then(response => {
          const newMessages = response.data.map(message => ({
            text: message.text,
          }));
          setAllMessages(prevMessages => [...prevMessages, ...newMessages]);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [selectedUserId]);


  return (
    <div>
      <span>The WebSocket is currently {isDialogSelected ? connectionStatus : "Выберете диалог"}</span>
      <div>{message}</div>
      <SideBar onSelectUser={handleUserSelect} />
      <InputBar sendJsonMessage={sendJsonMessage} setMessage={setMessage} handleSendMessage={handleSendMessage} />
      <div>
        <h2>Сообщения</h2>
        <div>
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>Произошла ошибка: {error.message}</p>
          ) : isDialogSelected ? (
            <ul>
              {Array.isArray(allMessages) ? (
                allMessages.map((message, index) => (
                  <li key={index}>{message.text}</li>
                ))
              ) : null}
            </ul>
          ) : null}
        </div>
        <ul>
          {Array.isArray(messages) ? (
            messages.map((message, index) => (
              <li key={index}>{message.text}</li>
            ))
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default Chat;