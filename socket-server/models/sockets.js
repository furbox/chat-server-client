const { comprobarJWT } = require('../helpers/jwt');

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('[SOCKET]: ', socket.handshake.query['x-token']);
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])
            if (!valido) {
                console.log('[SOCKET]: Socket no indentificado');
                return socket.disconnect();
            }
            console.log('[SOCKET]: Client Connected');
            console.log('[SOCKET]: ', socket.id);

            //validar jwt
            //desconectar si el token no es valido

            //saber que usuario esta activo mediante uid

            //emitir a todos los usuarios conectados

            //socket join

            //mensaje personal

            //desconectar

            //emitir los usuaios online

            socket.emit('[SERVER]:msg-bienvenida', {
                msg: 'Bienvenido al Server',
                fecha: new Date()
            });

            socket.on('[SOCKET-CLIENT]:msg-emit', (data) => {
                this.io.emit('[SOCKET-SERVER]:msg-emit', data);
            });


            socket.on('disconnect', () => {
                console.log('[SOCKET-CLIENT]: disconnected');
            })
        });
    }
}

module.exports = Sockets;