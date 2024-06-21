import React, { Component } from 'react';
import axios from 'axios';
import { Button, Image, Card, Form, Table, Row, Col, CardFooter } from 'react-bootstrap';

import './css/projects.css';

import csrftoken from './helper/crsf'; 
import TITLE from './info/title';
import Loader from './helper/loader';
import BACKENDURL from './info/backend';
import TopBar from "./helper/topbar";
import SideBar from "./helper/sidebar";
import Footer from './helper/footer';


const Page_TITLE = TITLE + " - Projects";


export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            todoList: [],
            modal: false,
            activeItem: {},
            user_data: {
                username: '',
                profileimage: ''
            },
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.isUserAuthorized();
        document.title = Page_TITLE;
    }

    isUserAuthorized = () => {
        axios
            .post(
                BACKENDURL + '/api/projects/isauthorized/',
                {},
                { headers: { 'X-CSRFToken': csrftoken } }
            )
            .then((response) => {
                const { username, profileimage } = response.data.data;
                this.setState({
                    isLoading: false,
                    user_data: { username, profileimage }
                });
                console.log(profileimage);
            })
            .catch((error) => {
                this.setState({ 
                    error: true,
                    isLoading: false
                });
                console.log('Something unexpected happened. Error: ' + error);
            });
    };

    render() {
        const { user_data, isLoading, error } = this.state;

        if (isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        // if (error) {
        //     return (
        //         <>
        //             <div>{error}</div>
        //         </>
        //     );
        // }

        return (
            <>
                <SideBar>
                    <TopBar page="Projects">
                    <div className='projects-container'>
                        <Row>
                            <Col className="mt-3">
                                <Card className='h-20'>
                                    <Card.Header>
                                        Search
                                    </Card.Header>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3">
                                <Card className="h-100">
                                    <Row noGutters className="flex-row h-100">
                                        <Col md={4}>
                                            <Card.Img
                                                variant="top"
                                                src={ user_data.profileimage }
                                                alt="Card image cap"
                                            />
                                        </Col>
                                        <Col md={8} className="d-flex flex-column">
                                            <Card.Body className="flex-grow-1">
                                            <Card.Title>
                                                <h1>Comprehensive Project Management Platform</h1>
                                            </Card.Title>
                                            <Card.Text>
                                                Develop a web-based platform to efficiently manage projects and team collaborations. It includes user registration, login, a comprehensive dashboard, chat/inbox functionality, project management, assignment tracking, and transaction monitoring.
                                            </Card.Text>
                                                <p>
                                                    Objectives:
                                                        <p>Provide an intuitive user interface for project and assignment management.</p>
                                                        <p>Ensure secure and efficient user registration and login processes.</p>
                                                        <p>Facilitate team collaboration through chat and notifications.</p>
                                                        <p>Streamline project management from assignment allocation to completion.</p>
                                                        <p>Offer detailed tracking and reporting of transactions related to projects and assignments.</p>
                                                </p>
                                            </Card.Body>
                                            <Card.Footer className="mt-auto">
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col className="mt-3">
                                <Card className="h-100">
                                    <Row noGutters className="flex-row h-100">
                                        <Col md={4}>
                                            <Card.Img
                                            variant="top"
                                            src={ user_data.profileimage }
                                            alt="Card image cap"
                                            />
                                        </Col>
                                        <Col md={8} className="d-flex flex-column">
                                            <Card.Body className="flex-grow-1">
                                            <Card.Title>
                                                <h1>Comprehensive Project Management Platform</h1>
                                            </Card.Title>
                                            <Card.Text>
                                                Develop a web-based platform to efficiently manage projects and team collaborations. It includes user registration, login, a comprehensive dashboard, chat/inbox functionality, project management, assignment tracking, and transaction monitoring.
                                            </Card.Text>
                                                <p>
                                                    Objectives:
                                                        <p>Provide an intuitive user interface for project and assignment management.</p>
                                                        <p>Ensure secure and efficient user registration and login processes.</p>
                                                        <p>Facilitate team collaboration through chat and notifications.</p>
                                                        <p>Streamline project management from assignment allocation to completion.</p>
                                                        <p>Offer detailed tracking and reporting of transactions related to projects and assignments.</p>
                                                </p>
                                            </Card.Body>
                                            <Card.Footer className="mt-auto">
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        <br />

                        <br />
                    </div>

                    <br />
                    <Footer />
                    </TopBar>
                </SideBar>
            </>
        );
    }
}