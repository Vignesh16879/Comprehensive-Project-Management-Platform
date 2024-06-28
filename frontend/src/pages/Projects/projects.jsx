import React, { Component } from 'react';
import { Image, Button, Card, Form, Row, Col, Pagination, DropdownButton, Dropdown, Modal } from 'react-bootstrap';

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

import './css/projects.css';

import profile_avatar from "../Images/profile_avatar.png";

const Page_TITLE = WebsiteTITLE + " - Projects";

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
            isLoading: false,
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
        if (!this.isUserAuthorizedCalled) {
            this.isUserAuthorized();
            this.isUserAuthorizedCalled = true;
        }
        document.title = Page_TITLE;
    }

    isUserAuthorized = () => {
        // axios
        //     .post(
        //         BACKENDURL + '/api/projects/isauthorized/',
        //         {
        //             'token': true
        //         },
        //         {
        //             headers: { 'X-CSRFToken': csrftoken }
        //         }
        //     )
        //     .then((response) => {
        //         const { username, profileimage } = response.data.data;
        //         this.setState({
        //             isLoading: false,
        //             user_data: { username, profileimage }
        //         });
        //         console.log(profileimage);
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             error: true,
        //             isLoading: false
        //         });
        //         console.log('Something unexpected happened. Error: ' + error);
        //         window.location.href = '/login';
        //     });
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, currentPage: 1 });
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

    handleItemsPerPageChange = (eventKey) => {
        this.setState({ itemsPerPage: eventKey === 'All' ? projects.length : parseInt(eventKey), currentPage: 1 });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    renderPagination = () => {
        const { search, itemsPerPage, currentPage } = this.state;

        // Filter projects based on search input
        const filteredProjects = projects.filter(project =>
            project.title.toLowerCase().includes(search.toLowerCase())
        );

        const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
        const maxPageNumbersToShow = 10;
        const halfWindow = Math.floor(maxPageNumbersToShow / 2);

        let startPage = currentPage - halfWindow;
        let endPage = currentPage + halfWindow;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, maxPageNumbersToShow);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        let paginationItems = [];
        for (let number = startPage; number <= endPage; number++) {
            paginationItems.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => this.handlePageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <Pagination className="mb-0">
                {startPage > 1 && <Pagination.First onClick={() => this.handlePageChange(1)} />}
                {startPage > 1 && <Pagination.Prev onClick={() => this.handlePageChange(currentPage - 1)} />}
                {paginationItems}
                {endPage < totalPages && <Pagination.Next onClick={() => this.handlePageChange(currentPage + 1)} />}
                {endPage < totalPages && <Pagination.Last onClick={() => this.handlePageChange(totalPages)} />}
            </Pagination>
        );
    }

    renderTableFooter = () => {
        const { itemsPerPage } = this.state;
        const itemsPerPageOptions = ['All', 5, 10, 25, 50, 100];

        return (
            <Row className="mb-3">
                <Col xs={12}>
                    <Row>
                        <Col md={8} className='mb-3'>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={`Items per page: ${itemsPerPage}`}
                                onSelect={this.handleItemsPerPageChange}
                            >
                                {itemsPerPageOptions.map(option => (
                                    <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                        <Col md={4} className='mb-3'>
                            <div className="d-flex justify-content-between">
                                {this.renderPagination()}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

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
                                <Col className="mb-3">
                                    <Card className='h-20'>
                                        {/* <Card.Header>
                                            Search
                                        </Card.Header> */}
                                        <Card.Body>
                                            <Row className='mb-3'>
                                                <Col md={6}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Search Projects"
                                                        value={search}
                                                        onChange={this.handleSearchChange}
                                                    />
                                                </Col>
                                                <Col md={4}></Col>
                                                <Col md={2}>
                                                    <div className="d-grid gap-2">
                                                        <Button>Filter</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {displayedProjects.map((project, index) => (
                                <Row key={index}>
                                    <Col className="mb-3">
                                        <Card className="h-100" style={{ height: '30vh' }}>
                                            <Card.Header>
                                                <b>{project.title}</b>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row noGutters className="flex-row h-100">
                                                    <Col md={3}>
                                                        <div style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}>
                                                            <Card.Img 
                                                                src={user_data.profileimage} 
                                                                alt="Card image cap" 
                                                                style={{ 
                                                                    position: 'absolute', 
                                                                    top: 0, 
                                                                    left: 0, 
                                                                    width: '100%', 
                                                                    height: '100%', 
                                                                    objectFit: 'cover' 
                                                                }} 
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={9}>
                                                        <p>Description: {project.description.substring(0, 200)}...</p>
                                                        <p>Project Budget: {project.budget}</p>
                                                        <p>Tags: {project.Tags.join(', ')}</p>
                                                        <p>Open For: {project.openfor.join(', ')}</p>
                                                    </Col>
                                                </Row>
                                                <p>
                                                    <a>Members:  </a>
                                                    <Image src={ profile_avatar } alt="" width="32" height="32" className="rounded-circle me-2" object-fit="cover" border-radius="50%" />
                                                    <Image src={ profile_avatar } alt="" width="32" height="32" className="rounded-circle me-2" object-fit="cover" border-radius="50%" />
                                                </p>
                                            </Card.Body>
                                            <Card.Footer className='mt-auto md-3m, xdfnm nm '>
                                                <Row className='md-3'>
                                                    <Col md={8} className='md-3'>
                                                        <small className="text-muted">Last updated {project.lastupdated} ago</small>
                                                    </Col>
                                                    <Col md={2} className='md-3'>
                                                        <div className="d-grid gap-2">
                                                            <Button variant="primary" className="mr-2" onClick={() => this.toggleModal(project)}>View More</Button>
                                                        </div>
                                                    </Col>
                                                    <Col md={2} className='md-3'>
                                                        <div className="d-grid gap-2">
                                                            <Button variant="success">Join Project</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </Row>
                            ))}
                            <Row className='mb-3'>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            {this.renderTableFooter()}
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
                    <Modal size="lg" show={showModal} onHide={this.toggleModal}>
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
