import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './style.css';

const Board = (props) => {

    const socket = props.socket;
    const pathname = window.location.pathname;
    const id = socket.id;
    const boardname = pathname.split('/game/')[1];

    function handleClick(e) {
        let target;
        e.target.className == "cardWord" ? target = e.target.parentNode.parentNode : target = e.target;
        console.log(target.getAttribute('cardnum'));
        target.classList.add('clicked');
    }
    
    function doSomethingWithSockets() {
        console.log(socket);
        console.log(pathname + `/${id}`);
    }

    useEffect(() => {
        doSomethingWithSockets();
    }, [])

    return (
        <div className="board">
            <h1>{props.list}</h1>
            <h2>{boardname}</h2>
            <div className="wrapper" id="board">
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
            </div>
            <small>
                Board ID: {socket.id}
            </small>
        </div>
    )
}

export default Board;