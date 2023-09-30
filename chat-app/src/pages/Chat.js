import React, { useEffect, useRef, useState } from 'react';

function Chat() {
    const chatContainerRef = useRef(null);

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, []);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

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
                    <p className="text-sm font-semibold leading-6 text-gray-900">Jopa</p>
                    {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">jopa@mail.ru</p> */}
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800'>
            <div class="flex flex-col flex-grow w-full max-w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={chatContainerRef}>
                    <div class="flex w-full mt-2 space-x-3 max-w-xs">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
                        <div>
                            <div class="p-3 rounded-r-lg rounded-bl-lg">
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                <div className="chat">
                        {sortedMessages.map((msg, index) => (
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
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
                    </div>
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
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
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p class="text-sm">Lorem ipsum dolor sit.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div class="flex-shrink-0 h-10 w-10 rounded-full"></div>
                    </div>
                </div>
                
                <div className="bg-gray-100 p-4">
                <input
                    className="flex items-center h-10 w-full rounded px-3 text-sm"
                    type="text"
                    placeholder="Писать тут"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
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