import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invite = () => {
    const [users, setUsers] = useState([]);
    const [gameNights, setGameNights] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedGameNight, setSelectedGameNight] = useState('');

    useEffect(() => {
        const fetchUsersAndGames = async () => {
            try {
                const token = localStorage.getItem('token');
                const [usersResponse, gameNightsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:5000/api/gamenights', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setUsers(usersResponse.data);
                setGameNights(gameNightsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsersAndGames();
    }, []);

    const handleInvite = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/invitations', {
                userId: selectedUser,
                gameNightId: selectedGameNight
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Invitation sent successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Invite Users</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select User:</label>
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                >
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Game Night:</label>
                <select
                    value={selectedGameNight}
                    onChange={(e) => setSelectedGameNight(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                >
                    <option value="">Select a game night</option>
                    {gameNights.map(gn => (
                        <option key={gn._id} value={gn._id}>{gn.name}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleInvite}
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
            >
                Send Invitation
            </button>
        </div>
    );
};

export default Invite;
