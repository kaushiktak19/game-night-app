import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HostDashboard from './pages/HostDashboard';
import PlayerDashboard from './pages/PlayerDashboard';
import CreateGameNight from './components/CreateGameNight';
import ManageGameNight from './components/ManageGameNight';
import Invite from './components/Invite';
import ViewGameNights from './components/ViewGameNights';
import RespondToInvitations from './components/RespondToInvitations';
import JoinGameNight from './components/JoinGameNight';
import GameLibrary from './components/GameLibrary';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/host-dashboard" element={<HostDashboard />}>
                    <Route path="create-game-night" element={<CreateGameNight />} />
                    <Route path="manage-game-night" element={<ManageGameNight />} />
                    <Route path="invite" element={<Invite />} />
                    <Route path="game-library" element={<GameLibrary />} />
                </Route>
                <Route path="/player-dashboard" element={<PlayerDashboard />}>
                    <Route path="view-game-nights" element={<ViewGameNights />} />
                    <Route path="respond-to-invitations" element={<RespondToInvitations />} />
                    <Route path="join-game-night" element={<JoinGameNight />} />
                    <Route path="game-library" element={<GameLibrary />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
