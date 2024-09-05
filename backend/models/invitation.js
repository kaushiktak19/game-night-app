const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    gameNight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameNight',
        required: true,
    },
    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    invitee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
});

module.exports = mongoose.model('Invitation', invitationSchema);
