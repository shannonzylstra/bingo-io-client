import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Home from './pages/Home';
// import Demo from './pages/demo';
// import SocketChat from './pages/SocketChat';
import Bingo from './pages/Bingo';
// import Codenames from './pages/Codenames';

const Content = (props) => {
    return(
        <Switch>
            <Route exact path='/'>
                <Bingo/>
            </Route>
            <Route exact path={`/game/*`}>
                <Bingo/>
            </Route>
            {/* <Route path="/123456">
                <Board pathname={window.location.pathname} list={wordsList} socket={socket} cards={cards}/>
            </Route> */}
            {/* <Route exact path='/' component={Home}/>
            <Route exact path='/demo' component={Demo}/>
            <Route path='/demo2'>
                <Home/>
            </Route>
            <Route path='/socket-chat'>
                <SocketChat/>
            </Route>
            <Route path='/bingo'>
                <Bingo socket={props.socket}/>
            </Route>
            <Route path='/codenames'>
                <Codenames socket={props.socket}/>
            </Route>
            <Route path='/demo/:room'>
                <Demo/>
            </Route>
            <Route path='/demo/room/:room' component={Home}/> */}
        </Switch>
    )
}

export default Content