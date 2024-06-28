import React, { Component } from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

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

import "./css/manage_projects.css";

import profile_avatar from "../Images/profile_avatar.png";


const Page_TITLE = WebsiteTITLE + " - Manage Projects";
const username = "Vignesh Goswami";
const profileimage = profile_avatar;


export default class ManageProjects extends Component {
    componentDidMount() {
        document.title = Page_TITLE;
    }

    render() {
        return (
            <>
                <SideBar page="Manage Projects" username={ username } profileimage={ profileimage }>
                    <TopBar page="Manage Projects">
                        <div className='manage-project-container'>
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
                                                src={ profile_avatar }
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
                                            src={ profile_avatar }
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
                        </div>
                        <Footer />
                    </TopBar>
                </SideBar>
            </>
        )
    }
}