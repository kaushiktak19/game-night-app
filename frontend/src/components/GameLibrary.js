import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameLibrary = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/games');
                setGames(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGames();
    }, []);

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Game Library</h2>
            <ul className="space-y-4">
                {games.map(game => (
                    <li key={game._id} className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold text-purple-200">{game.title}</h3>
                        <p className="text-gray-400">{game.description}</p>
                        {/* Additional game details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameLibrary;
