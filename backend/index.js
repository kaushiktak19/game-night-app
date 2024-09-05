const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const gameNightRoutes = require('./routes/gameNight');
const invitationRoutes = require('./routes/invitation');
const gameRoutes = require('./routes/game');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json());

// Use routes with Socket.IO
app.use('/api/auth', authRoutes);
app.use('/api/gamenights', gameNightRoutes(io));  // Pass io to the routes
app.use('/api/invitations', invitationRoutes(io));
app.use('/api/games', gameRoutes);   // Pass io to the routes

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
