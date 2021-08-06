const { usuarioConectado, usuarioDesconectado, getUsuarios } = require('../controllers/sockets');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async (socket) => {
            console.log('[SOCKET]: ', socket.handshake.query['x-token']);
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])
            if (!valido) {
                console.log('[SOCKET]: Socket no indentificado');
                return socket.disconnect();
            }
            console.log('[SOCKET]: Client Connected');
            console.log('[SOCKET]: ', socket.id);

            await usuarioConectado(uid);

            //unir al usuario a una sala de socket.io            
            socket.join(uid);

            //validar jwt
            //desconectar si el token no es valido

            //saber que usuario esta activo mediante uid

            //emitir a todos los usuarios conectados
            this.io.emit('[SERVER]:lista-usuarios', await getUsuarios());

            //socket join

            //mensaje personal
            socket.on('[SOCKET-CLIENT]:mensaje-personal', (payload) => {
                console.log(payload)
            });

            //desconectar

            //emitir los usuaios online

            socket.emit('[SERVER]:msg-bienvenida', {
                msg: 'Bienvenido al Server',
                fecha: new Date()
            });

            socket.on('[SOCKET-CLIENT]:msg-emit', (data) => {
                this.io.emit('[SOCKET-SERVER]:msg-emit', data);
            });

            socket.on('disconnect', async () => {
                console.log('[SOCKET-CLIENT]: disconnected');
                await usuarioDesconectado(uid);
                this.io.emit('[SERVER]:lista-usuarios', await getUsuarios());
            });
        });
    }
}

module.exports = Sockets;