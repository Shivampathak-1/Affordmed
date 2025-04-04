import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/top-users', {
                    headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN` }
                });
                setTopUsers(response.data.topUsers);
            } catch (error) {
                console.error('Error fetching top users:', error);
            }
        };
        fetchTopUsers();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Top Users</h1>
            <ul>
                {topUsers.map(user => (
                    <li key={user.user} className="mb-2 p-2 bg-gray-100 rounded">
                        User {user.user} - Posts: {user.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
