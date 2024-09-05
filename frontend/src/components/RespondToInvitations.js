import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RespondToInvitations = () => {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/invitations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInvitations(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInvitations();
    }, []);

    const handleResponse = async (invitationId, response) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/invitations/${invitationId}/response`, {
                response,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInvitations(invitations.filter(inv => inv._id !== invitationId));
            alert('Response recorded successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Respond to Invitations</h2>
            <ul className="space-y-4">
                {invitations.map(inv => (
                    <li key={inv._id} className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold text-purple-200">{inv.gameNight.name}</h3>
                        <p className="text-gray-400">{inv.gameNight.date} at {inv.gameNight.time}</p>
                        <p className="text-gray-500">{inv.gameNight.description}</p>
                        <div className="mt-2">
                            <button
                                onClick={() => handleResponse(inv._id, 'accept')}
                                className="bg-green-600 text-white py-1 px-3 rounded mr-2 hover:bg-green-700"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleResponse(inv._id, 'decline')}
                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                                Decline
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RespondToInvitations;
