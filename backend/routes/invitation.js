const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const Invitation = require('../models/invitation');
const GameNight = require('../models/gamenight');
const User = require('../models/user');

const router = express.Router();

module.exports = (io) => {
    // Send Invitation
    router.post('/invite', verifyToken, async (req, res) => {
        const { gameNightId, inviteeId } = req.body;

        try {
            const gameNight = await GameNight.findById(gameNightId);
            const invitee = await User.findById(inviteeId);

            if (!gameNight) {
                return res.status(404).json({ message: 'Game night not found' });
            }
            if (!invitee) {
                return res.status(404).json({ message: 'Invitee not found' });
            }

            const invitation = new Invitation({
                gameNight: gameNightId,
                inviter: req.user.userId,
                invitee: inviteeId,
            });

            await invitation.save();

            // Emit event for new invitation
            io.emit('invitationSent', invitation);

            // TODO: Send an email or in-app notification to the invitee

            res.status(201).json(invitation);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    // Respond to Invitation
    router.post('/respond', verifyToken, async (req, res) => {
        const { invitationId, response } = req.body;

        try {
            const invitation = await Invitation.findById(invitationId);

            if (!invitation) {
                return res.status(404).json({ message: 'Invitation not found' });
            }

            if (invitation.invitee.toString() !== req.user.userId) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            if (!['accepted', 'declined'].includes(response)) {
                return res.status(400).json({ message: 'Invalid response' });
            }

            invitation.status = response;
            await invitation.save();

            // Emit event for invitation response
            io.emit('invitationResponded', invitation);

            // TODO: Notify the host about the response

            res.json(invitation);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    return router;
};
