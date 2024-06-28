import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col, Button, Form, Card, Image } from 'react-bootstrap';

import './css/login.css';

// 
import { WebsiteTITLE } from '../info/info';
import API from "../Utils/utils";
import Loader from '../helper/loader';

// Helper
import TopNavbar from '../helper/topnavbar';
import SideNavbar from "../helper/sidenavbar";
import TopBar from '../helper/topbar';
import SideBar from '../helper/sidebar';
import Footer from '../helper/footer';
import PopUp from '../helper/popup';

import logo from "../Images/logo.png";
import image31 from "../Images/image31.jpg";


const Page_TITLE = WebsiteTITLE + " - Login";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberme: '0',
            error: '',
            popMessage: '',
            popType: '',
        };
    }

    componentDidMount() {
        document.title = Page_TITLE;
    }

    handleBack = () => {
        window.location.href = '/';
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = "login/login/";
        const { username, password, rememberme } = this.state;
        
        const raw = {
            "username" : username,
            "password" : password,
            "rememberme" : rememberme,
        }

        const {
            success,
            message,
            data,
            error
        } = API.handleRequest(url, raw);

        if(success) {
            window.location.href = '/dashboard';
        }
        else {
            this.setState({ 
                error: error, 
                popMessage: message, 
                popType: "error"
            });
        }
    }

    render() {
        const { username, password, rememberme, popMessage, popType } = this.state;

        return (
            <>
                <TopNavbar>
                    <div className="login-container bg-auto" styles={{ backgroundImage: `url(${image31})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <Container>
                            <Row>
                                <Col lg={10} className="offset-lg-1">
                                    <h2 className="text-light mb-3"><b>Login Now</b></h2>
                                    <Card className="shadow rounded-9">
                                        <Card.Body>
                                            <Row>
                                                <Col md={5} className="ps-0 d-none d-md-block">
                                                    <div className="form-right h-100   text-auto text-center pt-5">
                                                        <h2 className="fs-1">Welcome Back!!!</h2>
                                                        <Image variant="left" src={ logo } style={{ objectFit: 'cover' }} alt="Profile Avatar" />
                                                    </div>
                                                </Col>
                                                <Col md={7} className="pe-0">
                                                    <div className="form-left h-100 py-5 px-5">
                                                        <Form onSubmit={this.handleSubmit} className="row g-4">
                                                            <Col md={12}>
                                                                <label>Username<span className="text-danger">*</span></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-text"><i className="bi bi-person-fill"></i></div>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        placeholder="Enter Username"
                                                                        value={username}
                                                                        onChange={(e) => this.setState({ username: e.target.value })}
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col md={12}>
                                                                <label>Password<span className="text-danger">*</span></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-text"><i className="bi bi-lock-fill"></i></div>
                                                                    <input 
                                                                        type="password" 
                                                                        className="form-control" 
                                                                        placeholder="Enter Password"
                                                                        value={password}
                                                                        onChange={(e) => this.setState({ password: e.target.value })}
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col sm={6}>
                                                                <div className="form-check">
                                                                    <input 
                                                                        className="form-check-input" 
                                                                        type="checkbox" 
                                                                        id="inlineFormCheck" 
                                                                        value={rememberme}
                                                                        onChange={(e) => this.setState({ rememberme: e.target.value })}
                                                                    />
                                                                    <label className="form-check-label" htmlFor="inlineFormCheck">Remember me</label>
                                                                </div>
                                                            </Col>

                                                            <Col sm={6}>
                                                                <a href="/forgot" className="float-end text-primary">Forgot Password?</a>
                                                            </Col>

                                                            <Col md={12}>
                                                                <Button type="button" onClick={this.handleBack} className="btn btn-primary px-4 mt-4">Back</Button>
                                                                <Button type="submit" className="btn btn-primary px-4 float-end mt-4">Login</Button>
                                                            </Col>
                                                        </Form>
                                                    </div>
                                                </Col>
                                                
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <p className="text-end text-secondary mt-3">By Vignesh Goswami</p>
                                    <p className="text-end text-secondary mt-3">@{new Date().getFullYear()}</p>
                                </Col>
                            </Row>
                        </Container>
                        { popMessage && <PopUp message={popMessage} type={popType} /> }
                    </div>
                </TopNavbar>
            </>
        );
    }
}