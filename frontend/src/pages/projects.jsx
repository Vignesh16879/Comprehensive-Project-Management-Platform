import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Form, Row, Col, Dropdown, Modal } from 'react-bootstrap';

import './css/projects.css';

import csrftoken from './helper/crsf';
import TITLE from './info/title';
import Loader from './helper/loader';
import BACKENDURL from './info/backend';
import TopBar from "./helper/topbar";
import SideBar from "./helper/sidebar";
import Footer from './helper/footer';

const Page_TITLE = TITLE + " - Projects";
const generateProjects = () => {
    const projectTemplate = {
        "title": "Project Title",
        "description": "Develop a web-based platform to efficiently manage projects and team collaborations. It includes user registration, login, a comprehensive dashboard, chat/inbox functionality, project management, assignment tracking, and transaction monitoring.",
        "Tags": ["python", "react", "django", "mongo"],
        "members": ["Person-1", "Person-2"],
        "progress": "50%",
        "budget": "50,000",
        "openfor": ["frontend"],
        "lastupdated": "3days",
        "objective": "To create a robust platform that enhances productivity and communication within project teams."
    };

    return Array.from({ length: 1000 }, (_, i) => ({
        ...projectTemplate,
        title: `${projectTemplate.title} ${i + 1}`
    }));
};

const projects = generateProjects();

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
            isLoading: false, // For testing
            error: null,
            search: '',
            currentPage: 1,
            itemsPerPage: 10,
            showModal: false,
            selectedProject: null,
        };
        this.isUserAuthorizedCalled = false;
    }

    componentDidMount() {
        // if (!this.isUserAuthorizedCalled) {
        //     this.isUserAuthorized();
        //     this.isUserAuthorizedCalled = true;
        // }
        document.title = Page_TITLE;
    }

    isUserAuthorized = () => {
        axios
            .post(
                BACKENDURL + '/api/projects/isauthorized/',
                {
                    'token': true
                },
                {
                    headers: { 'X-CSRFToken': csrftoken }
                }
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
                window.location.href = '/login';
            });
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, currentPage: 1 });
    };

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    handleItemsPerPageChange = (itemsPerPage) => {
        this.setState({ itemsPerPage, currentPage: 1 });
    };

    filterProjects = () => {
        const { search } = this.state;
        return projects.filter(project =>
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            project.Tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
            project.members.some(member => member.toLowerCase().includes(search.toLowerCase())) ||
            project.budget.toLowerCase().includes(search.toLowerCase()) ||
            project.openfor.some(open => open.toLowerCase().includes(search.toLowerCase()))
        );
    };

    toggleModal = (project) => {
        this.setState({ showModal: !this.state.showModal, selectedProject: project });
    };

    render() {
        const { user_data, isLoading, error, search, currentPage, itemsPerPage, showModal, selectedProject } = this.state;

        if (isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        if (error) {
            return (
                <>
                    <div>{error}</div>
                </>
            );
        }

        const filteredProjects = this.filterProjects();
        const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
        const displayedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        return (
            <>
                <SideBar page="Projects">
                    <TopBar page="Projects">
                        <div className='projects-container'>
                            <Row>
                                <Col className="mt-3">
                                    <Card className='h-20'>
                                        <Card.Header>
                                            Search
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Projects"
                                                value={search}
                                                onChange={this.handleSearchChange}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {displayedProjects.map((project, index) => (
                                <Row key={index}>
                                    <Col className="mt-3">
                                        <Card className="h-100" style={{ height: '30vh' }}>
                                            <Card.Header>
                                                <b>{project.title}</b>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row noGutters className="flex-row h-100">
                                                    <Col md={3}>
                                                        <Card.Img src={user_data.profileimage} alt="Card image cap" />
                                                    </Col>
                                                    <Col md={9}>
                                                        <p>Description: {project.description.substring(0, 200)}...</p>
                                                        <p>Project Budget: {project.budget}</p>
                                                        <p>Tags: {project.Tags.join(', ')}</p>
                                                        <p>Open For: {project.openfor.join(', ')}</p>
                                                    </Col>
                                                </Row>
                                                <p>Members: {project.members.join(', ')}</p>
                                            </Card.Body>
                                            <Card.Footer className='mt-auto'>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <small className="text-muted">Last updated {project.lastupdated} ago</small>
                                                    <div>
                                                        <Button variant="primary" className="mr-2" onClick={() => this.toggleModal(project)}>View More</Button>  <Button variant="success">Join Project</Button>
                                                    </div>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col className="mt-3">
                                    <Card className='h-100'>
                                        <Card.Header>
                                            <b>Pagination</b>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between">
                                                <div className="pagination">
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map(page => (
                                                        <Button key={page} onClick={() => this.handlePageChange(page)}>{page}</Button>
                                                    ))}
                                                    {totalPages > 10 && '...'}
                                                </div>
                                                <Dropdown onSelect={this.handleItemsPerPageChange}>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Items per page
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {[5, 10, 20, 50].map((number, index) => (
                                                            <Dropdown.Item key={index} eventKey={number}>{number}</Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <Footer />
                    </TopBar>
                </SideBar>

                {selectedProject && (
                    <Modal show={showModal} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProject.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Description:</strong> {selectedProject.description}</p>
                            <p><strong>Objective:</strong> {selectedProject.objective}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => window.open('/project/' + selectedProject.title, '_blank')}>Open in New Page</Button>
                            <Button variant="secondary" onClick={this.toggleModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </>
        );
    }
}
