import React, { Component } from 'react';
import SideBar from './SideBar'
import InputBar from './InputBar'
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from 'js-cookie';

function Chat() {

  const csrftoken = Cookies.get('csrftoken')
  const sessionid = Cookies.get('sessionid')

  const { readyState } = useWebSocket("ws://127.0,0.1:8000/ws/chat/9/", {
    headers: {
      ['csrftoken']: csrftoken,
      ['sessionid']: sessionid,
    },
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  return (
    <div>
       <span>The WebSocket is currently {connectionStatus}</span>
      <SideBar />
      <InputBar />
    </div>
  )
}

export default Chat