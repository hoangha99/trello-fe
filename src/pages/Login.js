import React, { useState} from 'react';

import { loginApi } from '../Api/func/user';
import '../../src/style.css'
import {Redirect} from "react-router-dom";


const Login = (props) => {
    const [tfEmail, setEmail] = useState("");
    const [tfPassword, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async () => {
        const res = await loginApi({
            email: tfEmail,
            password: tfPassword
        });
        if (res.data != null) {
            localStorage.setItem("TOKEN", res.data.jwtToken);
            console.log(res.data.jwtToken);
            setRedirect(true)
        }

    }

    if(redirect){
        return <Redirect to="/home"/>;
    }

    return (
        <div className="login-wrapper">
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap py-5">
                                <div className="align-items-center justify-content-center"/>
                                <p className="text-center">LOGIN SYSTEM</p>

                                <div className="form-group">
                                    <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-user" /></div>
                                    <input type="text" className="form-control" placeholder="Username" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-lock" /></div>
                                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <button onClick={onSubmit} className="btn form-control btn-primary rounded submit px-3">LOGIN</button>
                                </div>
                                <div className="w-100 text-center mt-4 text">
                                    <p className="mb-0">Don't have an account?</p>
                                    <a href="/register">Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default Login;