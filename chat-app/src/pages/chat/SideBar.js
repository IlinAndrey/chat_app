import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SideBar({ onSelectUser }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try{
            const response = await axios.get('/api/v1/users/');
            setUsers(response.data);
        }catch (error){
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user.id);
        onSelectUser(user.id);
    };

  return (
    <div className="min-w-0 flex-auto">
        {users && users.results && users.results.map((user) => (
            <p className="text-sm font-semibold leading-6 text-gray-900" key={user.id} id={user.id} onClick={() => handleUserClick(user)}>
                {user.username}
            </p>
        ))}
    </div>
  )
}

export default SideBar