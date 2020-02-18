import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './App.css';

function App () {
    let [ response, setResponse ] = useState(false);
    let [ endpoint, setEndpoint ] = useState("http://127.0.0.1:4001");

    // Socket Stuff
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => setResponse(data));

    return (
        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                The temperature in Florence is: {response} °F
              </p>
              : <p>Loading...</p>}
        </div>
    );
}
export default App;