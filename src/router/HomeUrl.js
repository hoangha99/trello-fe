import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home';

class HomeUrl extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/home" component={Home}></Route>
            </Router>
        );
    }
}

export default HomeUrl;