const socketIO = require('socket.io')

const socketIOfunc = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('New Client Conntected');

        socket.on('join', ({ userId, roomId }) => {
            socket.join(roomId);
            console.log(`${userId} joined room ${roomId}`);
        })

        socket.on('message', (data) => {
            io.to(data.roomId).emit('message', data);
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected')
        })

    });
}

module.exports = socketIOfunc;