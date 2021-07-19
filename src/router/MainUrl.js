import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeTrello from '../pages/HomeTrello';
import Login_register from '../pages/Login_register';

const MainUrl = () => {
    return (
        <Router>
            <Route exact path="/home" component={HomeTrello}></Route>
            <Route exact path="" component={Login_register}></Route>
        </Router>
    );
}

export default MainUrl;