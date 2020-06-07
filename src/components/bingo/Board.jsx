import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './style.css';
import SocketChat from '../../pages/SocketChat'
import { Switch, Route, Link } from 'react-router-dom';


const Board = (props) => {

    const socket = props.socket;
    let [ path, setPath ] = useState(window.location.pathname);
    // const id = socket.id; // just grab socket.id instead in doSomethingWithSockets()
    // const boardname = window.location.pathname.split('/game/')[1];
    const boardname = path.split('/game/')[1];

    function handleClick(e) {
        let target;
        e.target.className == "cardWord" ? target = e.target.parentNode.parentNode : target = e.target;
        console.log(target.getAttribute('cardnum'));
        target.classList.add('clicked');
    }

    function doSomethingWithSockets() {
        console.log(socket);
        console.log(path + `/${socket.id}`); // just grab socket.id instead of const id
    }

    useEffect(() => {
        doSomethingWithSockets();
    }, [])

    return (
        <div className="board container">
            {/* <h2>Debate Bingo</h2> */}
            <div className="row col-12">
                <div className="wrapper" id="board">
                    {/* <div>
                        <span>Share this game with friends:</span>
                        <br/>
                        <span><Link to={`/game/${window.location.pathname.split('/game/')[1]}`}>{`bingo-io.herokuapp.com${window.location.pathname}`}</Link></span>
                    </div> */}
                    <div className="one">
                        {props.cards.map((card, id) => {
                            return (
                                <div className="card" cardnum={id+1} onClick={handleClick}>
                                    <div className="cardWordWrapper">
                                        <div className="cardWord">
                                            {card}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="two"></div>
                    <div  className="three"></div>
                    <div className="four"></div>
                    {/* <div className="five"></div> */}
                    <div className="after">
                        {/* <Chat socket={socket}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

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
    }, [message, messages]);

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
        <div className="containerz">
            <div className="rowz">
                <div className="col-4z">
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

export default Board;
