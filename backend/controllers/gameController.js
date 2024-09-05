// controllers/gameController.js

const Game = require('../models/game');
const User = require('../models/user');

// Add a game to the user's library
const addGame = async (req, res) => {
    const { name, type, minPlayers, maxPlayers, duration, complexity, status } = req.body;

    try {
        const newGame = new Game({
            name,
            type,
            minPlayers,
            maxPlayers,
            duration,
            complexity,
            status,
            createdBy: req.user.userId, // The authenticated user
        });

        await newGame.save();

        res.status(201).json({ message: 'Game added successfully', game: newGame });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all games in the user's library
const getUserGames = async (req, res) => {
    try {
        const games = await Game.find({ createdBy: req.user.userId });

        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update a game in the user's library
const updateGame = async (req, res) => {
    const { id } = req.params;
    const { name, type, minPlayers, maxPlayers, duration, complexity, status } = req.body;

    try {
        const game = await Game.findOneAndUpdate(
            { _id: id, createdBy: req.user.userId },
            { name, type, minPlayers, maxPlayers, duration, complexity, status },
            { new: true }
        );

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game updated successfully', game });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a game from the user's library
const deleteGame = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findOneAndDelete({ _id: id, createdBy: req.user.userId });

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    addGame,
    getUserGames,
    updateGame,
    deleteGame,
};
