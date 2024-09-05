const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['board game', 'video game', 'card game', 'other'],
        required: true,
    },
    minPlayers: {
        type: Number,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,  // Duration in minutes
        required: true,
    },
    complexity: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    status: {
        type: String,
        enum: ['owned', 'wishlist'],
        default: 'wishlist',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
