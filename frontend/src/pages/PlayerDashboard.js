import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('player'); // default role
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(''); // State to store error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            if (isRegistering) {
                // Handle registration
                await axios.post('http://localhost:5000/api/auth/register', {
                    username,
                    email,
                    password,
                    role,
                });
                alert('Registration successful! You can now log in.');
                setIsRegistering(false); // Switch to login mode
            } else {
                // Handle login
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email,
                    password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }});
    
                console.log('Login response:', response); // Log the response data
    
                const { token, user } = response.data;
                localStorage.setItem('token', token); // Store JWT token
    
                // Redirect based on user role
                if (user.role === 'host') {
                    navigate('/host-dashboard');
                } else {
                    navigate('/player-dashboard');
                }
            }
        } catch (error) {
            console.error('Error object:', error); // Log the entire error object
            console.error('Error response:', error.response); // Log the response part of the error
    
            // Set error message based on response
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black text-gray-200">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-bold mb-6 text-purple-300">{isRegistering ? 'Register' : 'Login'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Role:</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:border-purple-500"
                                >
                                    <option value="player">Player</option>
                                    <option value="host">Host</option>
                                </select>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-gray-100 rounded-md hover:bg-purple-500 transition duration-300"
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <p
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-center text-gray-400 mt-4 cursor-pointer hover:underline"
                >
                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
