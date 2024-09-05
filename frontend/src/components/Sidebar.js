import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, role }) => {
    return (
        <div className="bg-gray-800 w-64 min-h-screen text-gray-200">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-purple-300">{user.username}</h2>
                <p className="text-sm text-gray-400">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
            </div>
            <nav className="p-4">
                {role === 'host' && (
                    <>
                        <Link to="/dashboard/create-game-night" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Create Game Night
                        </Link>
                        <Link to="/dashboard/manage-game-night" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Manage Game Night
                        </Link>
                        <Link to="/dashboard/invite" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Invite
                        </Link>
                    </>
                )}
                {role === 'player' && (
                    <>
                        <Link to="/dashboard/view-game-nights" className="block py-2 px-4 rounded hover:bg-gray-700">
                            View Game Nights
                        </Link>
                        <Link to="/dashboard/respond-to-invitations" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Respond to Invitations
                        </Link>
                        <Link to="/dashboard/join-game-night" className="block py-2 px-4 rounded hover:bg-gray-700">
                            Join Game Night
                        </Link>
                    </>
                )}
                <Link to="/dashboard/game-library" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Game Library
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
