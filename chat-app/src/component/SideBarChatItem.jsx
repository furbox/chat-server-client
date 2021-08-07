import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const SideBarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext(ChatContext);
    const { chatActivo } = chatState;

    const onClick = async() => {
        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        });
        //cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${usuario.uid}`);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });
        //TODO: mover el scroll
        
    }

    return (
        <div onClick={onClick} className={`chat_list ${usuario.uid === chatActivo && 'active_chat'}`}>
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F3%2FAvatar-Transparent-Image.png&f=1&nofb=1" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{usuario.nombre}</h5>
                    {
                        (usuario.online) ? <span className="text-success">Online</span> : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
