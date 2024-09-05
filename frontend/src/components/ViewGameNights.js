import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGameNights = () => {
    const [gameNights, setGameNights] = useState([]);

    useEffect(() => {
        const fetchGameNights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/gamenights');
                setGameNights(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGameNights();
    }, []);

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Available Game Nights</h2>
            <ul className="space-y-4">
                {gameNights.map(gn => (
                    <li key={gn._id} className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold text-purple-200">{gn.name}</h3>
                        <p className="text-gray-400">{gn.date} at {gn.time}</p>
                        <p className="text-gray-500">{gn.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewGameNights;
