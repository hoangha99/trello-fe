import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/style.css'
import '../App.css'
import { HouseDoor, Grid3x3Gap, Grid1x2, PlusLg, PersonCircle } from 'react-bootstrap-icons';

const Header = () => {

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-blue">

                <div className="col-sm">
                    <ul>
                        <li className="li-list-item">
                            <a href="/"><Grid3x3Gap color="white" size={50} /></a>
                        </li>
                        <li className="li-list-item center-nd">
                            <a href="/"><HouseDoor color="white" size={50} /></a>
                        </li>
                        <li className="li-list-item">
                            <a href="/"><Grid1x2 color="white" size={50} ></Grid1x2></a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm header-title">
                    <h1>Trello</h1>
                </div>
                <div className="col-sm ">
                    <ul className="ul-right">
                        <li className="li-list-item">
                            <a href="/"><PlusLg color="white" size={50} /></a>
                        </li>
                        <li className="li-list-item">
                            <a href="/"><PersonCircle color="white" size={50} /></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Header;