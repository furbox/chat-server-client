import React, { useContext } from 'react';
import { ChatSelect } from '../component/ChatSelect';
import { InboxPeople } from '../component/InboxPeople';
import { Messages } from '../component/Messages';
import { ChatContext } from '../context/chat/ChatContext';

import '../css/chat.css';

export const ChatPage = () => {
    const { chatState } = useContext(ChatContext)
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />


                {/* <!-- Chat inicio --> */}

                {
                    (chatState.chatActivo) ? <Messages /> : <ChatSelect />
                }

                {/* <!-- Chat Fin --> */}

            </div>


        </div>
    )
}
