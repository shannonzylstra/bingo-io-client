import React, { useEffect, useState } from "react";
import Temperature from './components/darksky/Temperature';

function Chat (props) {
    let [ username, setUsername ] = useState('');
    let [ message, setMessage ] = useState('');
    let [ messages, setMessages ] = useState([]);

    let socketIo = props.socket;

    useEffect( () => {
        socketIo.on('RECEIVE_MESSAGE', function(data){
            console.log(data);
            addMessage(data);
        });    
    });

    const sendMessage = ev => {
        ev.preventDefault();
        console.log('ev', ev);
        socketIo.emit('SEND_MESSAGE', {
            author: username,
            message: message
        });
        setMessage('');
    }
    
    const addMessage = data => {
        console.log(data);
        setMessages([...messages, data]);
        console.log(messages);
    };
    console.log(message, messages, username)
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Global Chat</div>
                            <hr/>
                            <div className="messages">
                                {messages.map(message => {
                                    return (
                                        <div><strong>{message.author}</strong>: {message.message}</div>
                                    )
                                })}                                
                            </div>
                        </div>
                        <div className="card-footer">
                                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message"onChange={e => setMessage(e.target.value)}  className="form-control"/>
                                <br/>
                                <button onClick={sendMessage} className="btn btn-primary form-control">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;