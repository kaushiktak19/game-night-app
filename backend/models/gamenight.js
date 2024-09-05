const mongoose = require('mongoose');

const gameNightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    gameDetails: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('GameNight', gameNightSchema);
