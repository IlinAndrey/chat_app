import React, { Component, useEffect, useState } from 'react';
import SideBar from './SideBar'
import InputBar from './InputBar'
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from 'js-cookie';

function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const csrftoken = Cookies.get('csrftoken')
  const sessionid = Cookies.get('sessionid')
  // console.log(recipient)
  
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
      setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
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
  };




  return (
    <div>
       <span>The WebSocket is currently {connectionStatus}</span>
       <div>{message}</div>
      <SideBar onSelectUser={handleUserSelect}/>
      <InputBar sendJsonMessage={sendJsonMessage} setMessage={setMessage} handleSendMessage={handleSendMessage}/>
      <div>
        <h2>Сообщения</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Chat