// routes/game.js

const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { addGame, getUserGames, updateGame, deleteGame } = require('../controllers/gameController');

const router = express.Router();

// Route to add a game to the user's library
router.post('/', verifyToken, addGame);

// Route to get all games in the user's library
router.get('/', verifyToken, getUserGames);

// Route to update a game in the user's library
router.put('/:id', verifyToken, updateGame);

// Route to delete a game from the user's library
router.delete('/:id', verifyToken, deleteGame);

module.exports = router;
