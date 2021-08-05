import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    //socket server
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket]);

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);

    //escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on('[SERVER]:lista-usuarios', (usuarios) => {
            console.log(usuarios);
        });
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}