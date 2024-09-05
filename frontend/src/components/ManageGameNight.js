import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageGameNight = () => {
    const [gameNights, setGameNights] = useState([]);

    useEffect(() => {
        const fetchGameNights = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/gamenights', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGameNights(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGameNights();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/gamenights/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGameNights(gameNights.filter(gn => gn._id !== id));
            alert('Game Night deleted successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Manage Game Night</h2>
            <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Time</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {gameNights.map(gn => (
                        <tr key={gn._id}>
                            <td className="p-4">{gn.name}</td>
                            <td className="p-4">{gn.date}</td>
                            <td className="p-4">{gn.time}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleDelete(gn._id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                {/* Add update functionality if needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageGameNight;
