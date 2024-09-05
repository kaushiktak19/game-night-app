import React, { useState } from 'react';
import axios from 'axios';

const CreateGameNight = () => {
    const [gameNightName, setGameNightName] = useState('');
    const [gameDate, setGameDate] = useState('');
    const [gameTime, setGameTime] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/gamenights', {
                name: gameNightName,
                date: gameDate,
                time: gameTime,
                description,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Game Night created successfully!');
            // Clear the form or redirect if needed
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Create Game Night</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Game Night Name:</label>
                    <input
                        type="text"
                        value={gameNightName}
                        onChange={(e) => setGameNightName(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Date:</label>
                    <input
                        type="date"
                        value={gameDate}
                        onChange={(e) => setGameDate(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Time:</label>
                    <input
                        type="time"
                        value={gameTime}
                        onChange={(e) => setGameTime(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
                >
                    Create Game Night
                </button>
            </form>
        </div>
    );
};

export default CreateGameNight;
