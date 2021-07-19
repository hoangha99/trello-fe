import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';

class LoginUrl extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
            </Router>
        );
    }
}

export default LoginUrl;