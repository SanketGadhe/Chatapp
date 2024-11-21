const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (CSS, client-side JavaScript, etc.)
app.use(express.static('public'));

// Define the main route for rendering the chat page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send name', (username) => {
        io.emit('send name', username);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
