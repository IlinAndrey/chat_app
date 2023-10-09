import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import useWebSocket from 'react-use-websocket';


function Chat() {
    const csrftoken = Cookies.get('csrftoken')
    const chatContainerRef = useRef(null);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [targetRecipient, setTargetRecipient] = useState("")

<<<<<<< HEAD

    const WS_URL = `ws://localhost:8000/ws/chat/${targetRecipient}/`;



=======
    const WS_URL = `ws://localhost:8000/ws/chat/${targetRecipient}/`;


>>>>>>> 1bf60a847bfb41f1a087c376f2e9290a01dcf549
    useWebSocket(WS_URL, {
      onOpen: () => {
        console.log('WebSocket connection established.');
      }
    });

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

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, []);

    const handleClick = async (event) => {
        const recipientId = event.target.id;
        setTargetRecipient(recipientId);
        try {
          const response = await axios.get(`/api/v1/directmessages/?recipient=${recipientId}`);
          setMessages(response.data);
        } catch (error) {
          console.error(error);
        }
      };

<<<<<<< HEAD

      const sendMessage = (e) => {
        console.log(message)
        e.preventDefault();
    
          axios.post('/api/v1/directmessages/', {
             csrftoken: csrftoken,
             text: message,
             recipient: targetRecipient,
            }, {
            headers: {
              'X-CSRFToken' : csrftoken,
              'Content-Type': 'application/x-www-form-urlencoded',
              }
          })
            .then(response => {
              setMessage(response.data);
              window.location.reload();
            })
            .catch(error => {
              console.error('Ошибка отправки:', error);
            });
    
      }

      // const sendMessage = (e) => {
      //   console.log(message)
      //   e.preventDefault();
      //
      //     axios.post('/api/v1/directmessages/', {
      //        csrftoken: csrftoken,
      //        text: message,
      //        recipient: targetRecipient,
      //       }, {
      //       headers: {
      //         'X-CSRFToken' : csrftoken,
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //         }
      //     })
      //       .then(response => {
      //         setMessage(response.data);
      //         window.location.reload();
      //       })
      //       .catch(error => {
      //         console.error('Ошибка отправки:', error);
      //       });
      //
      // }

=======
      // const sendMessage = (e) => {
      //   console.log(message)
      //   e.preventDefault();
    
      //     axios.post('/api/v1/directmessages/', {
      //        csrftoken: csrftoken,
      //        text: message,
      //        recipient: targetRecipient,
      //       }, {
      //       headers: {
      //         'X-CSRFToken' : csrftoken,
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //         }
      //     })
      //       .then(response => {
      //         setMessage(response.data);
      //         window.location.reload();
      //       })
      //       .catch(error => {
      //         console.error('Ошибка отправки:', error);
      //       });
    
      // }


      const sendMessage = (e) => {
        e.preventDefault();
      
        const messageData = {
          recipient: targetRecipient,
          text: message
        };
      
        socket.send(JSON.stringify(messageData));
      };
>>>>>>> 1bf60a847bfb41f1a087c376f2e9290a01dcf549



      
      
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
      sendMessage();
      }
  };




    const handleLogout = (e) => {
        e.preventDefault();
    
        const data = { csrftoken };
    
          axios.post('/api-auth/logout/', data, {
            headers: {
              'X-CSRFToken' : csrftoken,
              'Content-Type': 'application/x-www-form-urlencoded',
              }
          })
            .then(response => {
              console.log('Успешный выход:', response.data);
              window.location.href = '/';
            })
            .catch(error => {
              console.error('Ошибка выхода:', error);
            });
      }


  return (
    <div className="flex">
        <div className="flex flex-col w-1/4 bg-gray-300 p-4 items-center">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                {users && users.results && users.results.map((user) => (
                    <p className="text-sm font-semibold leading-6 text-gray-900" key={user.id} id={user.id} onClick={handleClick}>
                    {user.username}
                    </p>
                ))}
                </div>
            </div>
            <button onClick={handleLogout} className='h-10 bg-red-500 hover:bg-red-700 text-white font-bold mx-4 px-4 rounded bottom-0 left-0'>Выход</button>            
        </div>
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800'>
            <div class="flex flex-col flex-grow w-full max-w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={chatContainerRef}>
                        <div>
                        {messages && messages.results && messages.results.map((message) => (
                            <div key={message.id}>
                            {message.recipient == targetRecipient ? (
                                <div className="flex justify-end">
                                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg mb-5">
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 leading-none">
                                        {message.created}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 p-3 rounded-r-lg rounded-bl-lg justify-start mb-5">
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 leading-none">
                                        {message.created}
                                    </span>
                                </div>
                            )}
                            </div>
                        ))}
                        </div>
                </div>
                
                <form className="flex bg-gray-100 p-4 items-center ">
                <input
                    className="h-10 w-11/12 rounded px-3 text-sm"
                    type="text"
                    placeholder="Писать тут"
                    // value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 px-4 rounded"
                    type="submit"
                    onClick={sendMessage}
                >
                    Отправить
                </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Chat