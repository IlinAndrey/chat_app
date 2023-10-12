import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SideBar() {
    const [users, setUsers] = useState([])

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

  return (
    <div className="min-w-0 flex-auto">
        {users && users.results && users.results.map((user) => (
            <p className="text-sm font-semibold leading-6 text-gray-900" key={user.id} id={user.id}>
                {user.username}
            </p>
        ))}
    </div>
  )
}

export default SideBar