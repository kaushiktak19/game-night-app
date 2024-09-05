const express = require('express');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');
const GameNight = require('../models/gamenight');

const router = express.Router();

module.exports = (io) => {
    // Route to create a new game night (only accessible by hosts)
    router.post('/', verifyToken, requireRole('host'), async (req, res) => {
        const { title, date, time, location, gameDetails } = req.body;

        try {
            // Check if all required fields are provided
            if (!title || !date || !time || !location || !gameDetails) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const newGameNight = new GameNight({
                title,
                date,
                time,
                location,
                gameDetails,
                host: req.user.userId,
            });

            await newGameNight.save();
            
            // Emit event for real-time updates
            io.emit('gameNightCreated', newGameNight);

            res.status(201).json(newGameNight);
        } catch (error) {
            console.error("Error creating new game night:", error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });

    // Get all game nights for a specific user (host)
    router.get('/user', verifyToken, async (req, res) => {
        try {
            const gameNights = await GameNight.find({ host: req.user.userId });
            res.json(gameNights);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    // Update a game night (only accessible by hosts)
    router.put('/:id', verifyToken, requireRole('host'), async (req, res) => {
        const { title, date, time, location, gameDetails } = req.body;
        try {
            const updatedGameNight = await GameNight.findByIdAndUpdate(
                req.params.id,
                { title, date, time, location, gameDetails },
                { new: true } // Return the updated document
            );

            if (!updatedGameNight) {
                return res.status(404).json({ message: 'Game night not found' });
            }

            // Emit event for game night update
            io.emit('gameNightUpdated', updatedGameNight);

            res.json(updatedGameNight);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    // Delete a game night (only accessible by hosts)
    router.delete('/:id', verifyToken, requireRole('host'), async (req, res) => {
        try {
            const deletedGameNight = await GameNight.findByIdAndDelete(req.params.id);

            if (!deletedGameNight) {
                return res.status(404).json({ message: 'Game night not found' });
            }

            // Emit event for game night deletion
            io.emit('gameNightDeleted', { id: req.params.id });

            res.json({ message: 'Game night deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    // Route to get all game nights (accessible by any authenticated user)
    router.get('/', verifyToken, async (req, res) => {
        try {
            const gameNights = await GameNight.find();
            res.json(gameNights);
        } catch (error) {
            console.error("Error fetching game nights:", error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });

    return router;
};
