import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

function SocketChat () {
    // let [ response, setResponse ] = useState(false);
    let [ endpoint1, setEndpoint1 ] = useState("http://127.0.0.1:4001");
    let [ messages1, setMessages1 ] = useState([]);

    // Socket Stuff
    const socket = socketIOClient(endpoint1);
    // socket.on("FromAPI", data => setResponse(data));

    useEffect(() => {
        socket.on('chat message', function(message) {
            console.log(message);
            addMessage(message);
        });
    });

    const addMessage = message => {
        console.log(message);
        setMessages1([...messages1, message]);
        console.log(messages1);
    };

    function sayIt(e) {
        // Cancel the postback
        e.preventDefault();
        console.log(e.target.value);

        // Grab the info from the form
        let name = document.getElementById('name').value;
        let chat = document.getElementById('chat').value;
        console.log("name",name,"chat",chat);

        // Make sure form fields aren't empty
        if (!name || !chat) {
            console.log('Empty message');
            return;
        };

        // Format the message
        let message = `${name} says: ${chat}`;

        // Send the message via the socket
        socket.emit('chat message', message);

        // Clear out the chat textbox
        document.getElementById('chat').value = '';

        console.log('Hello', chat, name);
    }

    return (
        <div className="socket-chat container">
            <form id="chat-form">
                <div>
                    <label for="chat">Comment:</label>
                    <input type="text" id="chat" name="chat"/>
                </div>
                <br />
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" placeholder="Anonymous" name="name"/>
                </div>
                <br />
                <button onClick={sayIt} className="btn btn-primary form-control" value="Say it!">Say it!</button>
            </form>
            <hr />
            <h2>Ongoing Conversation</h2>
            <div id="result">
                <div className="messages">
                    {messages1.map(message => {
                        return (
                            // <div><strong>{message.author}</strong>: {message.message}</div>
                            <div>{message}</div>
                        )
                    })}                                
                </div>
            </div>
        </div>
    );
}
export default SocketChat;