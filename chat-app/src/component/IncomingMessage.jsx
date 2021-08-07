import React from 'react';
import { horaMes } from '../helpers/horaMes';

export const IncomingMessage = ({ msg }) => {
    
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F3%2FAvatar-Transparent-Image.png&f=1&nofb=1" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{msg.mensaje}</p>
                    <span className="time_date">{horaMes(msg.createdAt)}</span>
                </div>
            </div>
        </div>
    )
}
