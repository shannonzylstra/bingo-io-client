import React, { useEffect, useState } from "react";

function Chat () {
    let [ username, setUsername ] = useState('');
    let [ message, setMessage ] = useState('');
    let [ messages, setMessages ] = useState([]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Global Chat</div>
                            <hr/>
                            <div className="messages">
                                
                            </div>
                        </div>
                        <div className="card-footer">
                                <input type="text" placeholder="Username" className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control"/>
                                <br/>
                                <button className="btn btn-primary form-control">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;