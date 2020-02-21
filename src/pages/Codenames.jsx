import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Codenames from '../components/bingo/Codenames';

const CodenamesGame = (props) => {
    let [ words, setWords ] = useState([]);
    let [ cards, setCards ] = useState([]);
    let [ wordsList, setWordsList ] = useState('');
    // let [ endpoint, setEndpoint ] = useState("http://127.0.0.1:4001");

    // Socket Stuff
    // const socket = socketIOClient(endpoint);
    const socket = props.socket

    socket.on("bingo", data => {
        setWords(data.response);
        setCards(data.cards);
        setWordsList(data.lists[0][0])
    });

    return (
        <div className="bingo">
            <Codenames list={wordsList} socket={socket.id} cards={cards} words={words}/>
        </div>
    )
}

export default CodenamesGame;