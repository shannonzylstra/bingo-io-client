import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Board from '../components/bingo/Board';
import namor from 'namor';
import { BrowserRouter as Router} from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';

const Bingo = (props) => {
    let [ words, setWords ] = useState([]);
    let [ cards, setCards ] = useState([]);
    let [ wordsList, setWordsList ] = useState('');
    let [ endpoint, setEndpoint ] = useState("http://127.0.0.1:4001");

    let [ room, setRoom ] = useState('');

    // Socket Stuff
    const socket = socketIOClient(endpoint);

    /* generate 3 words and no random characters */
    const name = namor.generate({ words: 1, saltLength: 6 })

    useEffect(() => {
        console.log('Using effect!');
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
            setCards(data);
            // setWordsList(data.lists[0][0])
        });
        // socket.on("joinARoom", data => {
        //     setRoom(data);
        // })
        socket.emit("joinARoom");
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
                        <Link to={`/game/${name}`}>{`/game/${name}`}</Link>                    
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