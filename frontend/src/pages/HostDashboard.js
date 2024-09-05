import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateGameNight from '../components/CreateGameNight';
import ManageGameNight from '../components/ManageGameNight';
import Invite from '../components/Invite';
import GameLibrary from '../components/GameLibrary';

const HostDashboard = () => {
    const [user, setUser] = useState({});
    const [role] = useState('host'); // Fixed to 'host' for this dashboard
    const [activeTab, setActiveTab] = useState('create-game-night');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate]);

    return (
        <div className="flex">
            <Sidebar user={user} role={role} />
            <div className="flex-1 p-8 bg-gray-900 text-gray-200">
                {activeTab === 'create-game-night' && <CreateGameNight />}
                {activeTab === 'manage-game-night' && <ManageGameNight />}
                {activeTab === 'invite' && <Invite />}
                {activeTab === 'game-library' && <GameLibrary />}
                <div className="mt-4">
                    <button onClick={() => setActiveTab('create-game-night')} className="mr-4 bg-purple-600 text-white py-2 px-4 rounded">Create Game Night</button>
                    <button onClick={() => setActiveTab('manage-game-night')} className="mr-4 bg-purple-600 text-white py-2 px-4 rounded">Manage Game Night</button>
                    <button onClick={() => setActiveTab('invite')} className="mr-4 bg-purple-600 text-white py-2 px-4 rounded">Invite</button>
                    <button onClick={() => setActiveTab('game-library')} className="bg-purple-600 text-white py-2 px-4 rounded">Game Library</button>
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
