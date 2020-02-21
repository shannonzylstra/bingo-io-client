import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Chat from '../Chat'
import Temperature from '../components/darksky/Temperature';
import PlaceOrder from "../components/PlaceOrder";

function Demo () {
    // let [ response, setResponse ] = useState(false);
    let [ endpoint, setEndpoint ] = useState("http://127.0.0.1:4001");

    // Socket Stuff
    const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", data => setResponse(data));

    return (
      <div className='app'>
        <Temperature socket={socket}/>
        <PlaceOrder socket={socket}/>
        <div className='chat'>
          <Chat socket={socket}/>
          <Chat socket={socket}/>
        </div>
      </div>
    );
}
export default Demo;