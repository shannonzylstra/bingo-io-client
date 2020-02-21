import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './content';

function App() {
  return (
    <Router>
      <div className="App">
        <Content/>
      </div>
    </Router>
  );
}

export default App;