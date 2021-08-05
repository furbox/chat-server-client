import React from 'react';
import { ChatSelect } from '../component/ChatSelect';
import { InboxPeople } from '../component/InboxPeople';
import { Messages } from '../component/Messages';

import '../css/chat.css';

export const ChatPage = () => {
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />


                {/* <!-- Chat inicio --> */}
                
                {
                    (false) ? <Messages /> : <ChatSelect/>
                }
                
                {/* <!-- Chat Fin --> */}

            </div>


        </div>
    )
}
