import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';

import "./css/topnavbar.css";


export default class TopNavbar extends Component {
    render() {
        const { isLogged, children } = this.props;

        return (
            <>
                <div className="container position-sticky z-index-sticky top-0">
                    <Row>
                        <Col md={12}>
                            <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                                <div className="container-fluid pe-0">
                                    <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="/">
                                        DragonEyeX
                                    </a>
                                    <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon mt-2">
                                            <span className="navbar-toggler-bar bar1"></span>
                                            <span className="navbar-toggler-bar bar2"></span>
                                            <span className="navbar-toggler-bar bar3"></span>
                                        </span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navigation">
                                        <ul className="navbar-nav mx-auto ms-xl-auto me-xl-7">
                                            {!isLogged ? (
                                                <>
                                                    <li className="nav-item">
                                                        <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="/">
                                                            <i className="fa fa-chart-pie opacity-6 text-auto me-1"></i>
                                                            Home
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link me-2" href="/register">
                                                            <i className="fas fa-user-circle opacity-6 text-auto me-1"></i>
                                                            Sign Up
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link me-2" href="/login">
                                                            <i className="fas fa-key opacity-6 text-auto me-1"></i>
                                                            Sign In
                                                        </a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="nav-item">
                                                        <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="/dashboard">
                                                            <i className="fa fa-chart-pie opacity-6 text-auto me-1"></i>
                                                            Dashboard
                                                        </a>
                                                    </li>
                                                </>
                                            )
                                        }  
                                        </ul>
                                        {/* <li className="nav-item d-flex align-items-center">
                                            <a className="btn btn-round btn-sm mb-0 btn-outline-primary me-2" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-soft-ui-dashboard">Online Builder</a>
                                        </li> */}
                                        <ul className="navbar-nav d-lg-block d-none">
                                            <li className="nav-item">
                                                <a href="/aboutus" className="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark" margin-right="1rem">About Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </Col>
                    </Row>
                </div>
                <div className="fixed-plugin">
                    { children }
                </div>
            </>
        );
    }
}