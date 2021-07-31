class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('[SOCKET]: Client Connected');
            console.log('[SOCKET]: ', socket.id);

            socket.emit('[SERVER]:msg-bienvenida', {
                msg: 'Bienvenido al Server',
                fecha: new Date()
            });

            socket.on('[SOCKET-CLIENT]:msg-emit', (data) => {
                this.io.emit('[SOCKET-SERVER]:msg-emit', data);
            });
        });
    }
}

module.exports = Sockets;