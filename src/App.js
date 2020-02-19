import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
import Chat from './Chat'
import Florence from './components/Florence';

function App () {
    let [ response, setResponse ] = useState(false);
    let [ endpoint, setEndpoint ] = useState("http://127.0.0.1:4001");

    // Socket Stuff
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => setResponse(data));

    return (
      <div className='app'>
        <Florence response={response}/>
        <div className='chat'>
          <Chat socket={socket}/>
        </div>
      </div>
    );
}
export default App;