import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Board from '../components/bingo/Board';
import namor from 'namor';
import { BrowserRouter as Router} from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';
import SocketChat from '../pages/SocketChat'
import Chat from '../Chat';

const Bingo = (props) => {
    let [ words, setWords ] = useState([]);
    let [ cards, setCards ] = useState([]);
    let [ wordsList, setWordsList ] = useState('');
    let [ endpoint, setEndpoint ] = useState("bingo-io-server.herokuapp.com");
    const boardname = window.location.pathname.split('/game/')[1];

    let [ room, setRoom ] = useState('');

    // Socket Stuff
    const socket = socketIOClient(endpoint);

    /* generate 3 words and no random characters */
    const name = namor.generate({ words: 0, saltLength: 6 })

    let [ roomId, setRoomId ] = useState('');

    const shuffle = function (array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
      
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
      
        return array;
      };

    useEffect(() => {
        console.log('boardname:', boardname)
        if (window.location.pathname !== '/') {
            setRoomId(window.location.pathname)
        }
        console.log('Using effect!');
        console.log('words/' + boardname);
        // fetch('http://bingo-io-server.herokuapp.com/words/' + boardname, {
        fetch('http://bingo-io-server.herokuapp.com/words/' + 'election', {
            // headers: {
            //     'Origin': 'http://localhost:4001/'
            // }
        })
        .then(res => res.json())
        .then((res) => {
            setCards(shuffle(res[0].cards.slice(0,25)));
            console.log('res.cards:', res[0].cards);
        })
        .catch(err => {
            console.log('Error:', err);
        })
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // }
            // fetch(`http://localhost:4001/words`, {
            //     headers: {
            //         'Access-Control-Allow-Origin': '*'
            //     }
            // })
            // .then(response => response.json())
            // .then((res) => {
            //   console.log('Words:', res.data);
            //   setWords(res.data.response);
            //   setCards(res.data.cards);
            //   setWordsList(res.data.lists[0][0]);
            // })
            // .catch(err => {
            //     console.log('Error shoot:', err);
            // })    
        socket.on("bingo", data => {
            // setWords(data.response);
            // setCards(data);
            // setWordsList(data.lists[0][0])
        });
        // socket.on("joinARoom", data => {
        //     setRoom(data);
        // })
        socket.emit("getARoom");
    }, [])

    // socket.on("bingo", data => {
    //     setWords(data.response);
    //     setCards(data.cards);
    //     setWordsList(data.lists[0][0])
    // });

    return (
        <div className="bingo">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Link to={`/game/${name}`}>Play debate night bingo!</Link>                    
                    </Route>
                    <Route exact path={`/game/*`}>
                        <Board pathname={window.location.pathname} list={wordsList} socket={socket} cards={cards}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Bingo;