import React from 'react';
import Header from './Header';
import Header2 from './Header2';
import List from './List/List'

function Board(props) {
    return (
        <div>
            <Header />
            <Header2/>
            <List id = {props.match.params.id}/>
        </div>
    );
}

export default Board;