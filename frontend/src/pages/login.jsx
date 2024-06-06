import React, { Component } from 'react';

import './css/login.css';

import profile_avatar from "./images/profile_avatar.png";


const TITLE = "DragonEyeX - Login";


export default class Login extends Component {
    componentDidMount() {
        document.title = TITLE;
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    handleBack = () => {
        window.location.href = '/';
    }

    render() {
        return (
            <>
                <div className="login-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <h3 className="mb-3">Login Now</h3>
                                <div className="shadow rounded">
                                    <div className="row">
                                        <div className="col-md-7 pe-0">
                                            <div className="form-left h-100 py-5 px-5">
                                                <form action="" className="row g-4">
                                                    <div className="col-12">
                                                        <label>Username<span className="text-danger">*</span></label>
                                                        <div className="input-group">
                                                            <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                                                            <input type="text" className="form-control" placeholder="Enter Username" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <label>Password<span className="text-danger">*</span></label>
                                                        <div className="input-group">
                                                            <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                                                            <input type="password" className="form-control" placeholder="Enter Password" />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                                                            <label className="form-check-label" htmlFor="inlineFormCheck">Remember me</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <a href="/forgot" className="float-end text-primary">Forgot Password?</a>
                                                    </div>

                                                    <div className="col-12">
                                                        <center>
                                                            <div className="g-recaptcha" id="rcaptcha" data-sitekey="6LcgpRApAAAAAOPrH1LgyowKjtyMJqom4ZaZWIDJ"></div>
                                                            <span id="captcha" style={{ color: 'red' }}></span>
                                                        </center>
                                                    </div>

                                                    <div className="col-12">
                                                        <button type="button" onClick={this.handleBack} className="btn btn-primary px-4 mt-4">Back</button>
                                                        <button type="submit" className="btn btn-primary px-4 float-end mt-4">Login</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-5 ps-0 d-none d-md-block">
                                            <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                                <i className="bi bi-bootstrap"></i>
                                                <h2 className="fs-1">Welcome Back!!!</h2>
                                                <img src={ profile_avatar } style={{ objectFit: 'contain' }} alt="Profile Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-end text-secondary mt-3">By Vignesh Goswami</p>
                                <p className="text-end text-secondary mt-3">@{new Date().getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
