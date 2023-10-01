import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Chat() {
    const chatContainerRef = useRef(null);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchUsers = async () => {
        try {
        const response = await axios.get('/api/v1/users/');
        setUsers(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Загрузка сообщений для выбранного пользователя
    useEffect(() => {
        if (selectedUser) {
        fetch(`/api/v1/directmessages/${selectedUser.id}`)
            .then((response) => response.json())
            .then((data) => setMessages(data.messages));
        }
    }, [selectedUser]);

    // Обработчик клика на пользователя
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, []);

    const handleMessageSend = () => {
        const newMessage = {
        text: message,
        timestamp: new Date().toLocaleString()
        };
        setMessages([newMessage, ...messages]);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
        handleMessageSend();
        }
    };


    const sortedMessages = messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


  return (
    <div className="flex">
        <div className="flex flex-col w-1/4 bg-gray-300 p-4">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                {users && users.results && users.results.map((user) => (
                    <p
                    className="text-sm font-semibold leading-6 text-gray-900"
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    >
                    {user.username}
                    </p>
                ))}
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800'>
            <div class="flex flex-col flex-grow w-full max-w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={chatContainerRef}>
                    <div className="chat flex-1 p-4">
                        {messages.map((msg, index) => (
                        <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">{msg.timestamp}</span>
                            </div>
                            <div className="flex-shrink-0 h-10 w-10 rounded-full"></div>
                        </div>
                        ))}
                    </div>
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
                    </div>
                    <div class="flex w-full mt-2 space-x-3 max-w-xs">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
                        <div>
                            <div class="p-3 rounded-r-lg rounded-bl-lg">
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex bg-gray-100 p-4 items-center ">
                <input
                    className="h-10 w-11/12 rounded px-3 text-sm"
                    type="text"
                    placeholder="Писать тут"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 px-4 rounded"
                    onClick={handleMessageSend}
                >
                    Отправить
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat