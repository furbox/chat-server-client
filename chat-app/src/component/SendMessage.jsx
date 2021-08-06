import React, { useState } from 'react';

export const SendMessage = () => {
    const [mensaje, setMensaje] = useState('');

    const onChange = ({ target }) => {
        setMensaje(target.value);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(mensaje.length === 0) {return;}
        setMensaje('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input onChange={onChange} value={mensaje} type="text" className="write_msg" placeholder="Mensaje..." />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
