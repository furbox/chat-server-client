import React from 'react';

export const SideBarChatItem = () => {
    return (
        <div className="chat_list ">
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F3%2FAvatar-Transparent-Image.png&f=1&nofb=1" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>Some random name</h5>
                    <span className="text-success">Online</span>
                    <span className="text-danger">Offline</span>
                </div>
            </div>
        </div>
    )
}
