import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {
    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className="inbox_chat">

            {/* <!-- conversación activa inicio --> */}
            {
                chatState.usuarios.filter(user=> user.uid !== auth.uid).map((user) => (
                    <SideBarChatItem key={user.uid} usuario={user} />
                ))
            }

            {/* <!-- conversación activa Fin --> */}


            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>
    )
}
