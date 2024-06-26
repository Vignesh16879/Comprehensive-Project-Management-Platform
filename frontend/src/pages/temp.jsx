import React, { Component } from 'react';
import { Row, Col, Card, Form, Button, Image, InputGroup, FormControl } from 'react-bootstrap';

import Loader from './helper/loader';
import Footer from './helper/footer';
import SideBar from './helper/sidebar';
import TopBar from './helper/topbar';
import ToolBar from './helper/toolbar';

import './css/transactions.css';

import curved14 from "./images/curved14.jpg";
import mastercard from "./images/mastercard.png";


const WebsiteTITLE = 'My Website';
const Page_TITLE = WebsiteTITLE + ' - Transactions';


export default class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            todoList: [],
            modal: false,
            activeItem: {},
            user_data: {
                username: 'Vignesh',
                profileimage: ''
            },
            isLoading: false,
            error: null,
            currentPage: 1,
            itemsPerPage: 10,
            searchQuery: '',
            filters: {
                from: '',
                to: '',
                amount: '',
                date: '',
                action: '',
            },
            sortConfig: {
                field: '',
                direction: 'asc',
            },
        };
        this.isUserAuthorizedCalled = false;
    }

    componentDidMount() {
        document.title = Page_TITLE;
        // Add any data fetching here if needed
    }

    handleItemsPerPageChange = (event) => {
        this.setState({
            itemsPerPage: Number(event.target.value),
            currentPage: 1, // Reset to the first page whenever items per page changes
        });
    };

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleFilterChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [name]: value,
            },
        }));
    };

    toggleSortDirection = (field) => {
        const { sortConfig } = this.state;
        if (sortConfig.field === field) {
            const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
            this.setState({ sortConfig: { field, direction } });
        } else {
            this.setState({ sortConfig: { field, direction: 'asc' } });
        }
    };

    sortData = (data) => {
        const { sortConfig } = this.state;
        if (!sortConfig.field) {
            return data;
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[sortConfig.field] < b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.field] > b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    };

    handleSort = (field) => {
        this.toggleSortDirection(field);
    };

    renderPagination = (totalPages, currentPage) => {
        let pages = [];

        if (totalPages <= 10) {
            pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages.map((page, index) =>
            page === '...' ? (
                <span key={index} className="mx-2">...</span>
            ) : (
                <Button
                    key={index}
                    onClick={() => this.handlePageChange(page)}
                    variant={page === currentPage ? 'primary' : 'secondary'}
                    className="me-1"
                >
                    {page}
                </Button>
            )
        );
    };

    render() {
        const { isLoading, user_data, currentPage, itemsPerPage, searchQuery, filters, sortConfig } = this.state;

        if (isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        const transactionData = Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            from: `From ${i + 1}`,
            to: `To ${i + 1}`,
            amount: Math.floor(Math.random() * 1000),
            date: new Date(2022, 5, i + 1).toLocaleDateString(),
            action: `Action ${i + 1}`,
        })); // Example data

        const filteredData = transactionData.filter(item => {
            // Apply filters here (you can extend this logic to include your data fields)
            return item.from.toLowerCase().includes(filters.from.toLowerCase())
                && item.to.toLowerCase().includes(filters.to.toLowerCase())
                && item.amount.toString().includes(filters.amount)
                && item.date.includes(filters.date)
                && item.action.toLowerCase().includes(filters.action.toLowerCase());
        });

        const sortedData = this.sortData(filteredData);

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(sortedData.length / itemsPerPage);

        return (
            <>
                <SideBar page="Transactions" username={user_data.username} profileimage={user_data.profileimage}>
                    <TopBar page="Transactions">
                        <div className='transactions-container'>

                            <Row className="mb-3">
                                <Col lg={8} >
                                    <Row>
                                        <Col xl={6} className="mb-xl-0 mb-4">
                                            <Card className="bg-transparent shadow-xl">
                                                <div className="overflow-hidden position-relative border-radius-xl" style={{ backgroundImage: `url(${curved14})`, }}>
                                                    <span className="mask bg-gradient-dark"></span>
                                                    <Card.Body className="position-relative z-index-1 p-3">
                                                        <i className="fas fa-wifi text-white p-2"></i>
                                                        <h5 className="text-white mt-4 mb-5 pb-2">4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
                                                        <div className="ms-auto d-flex">
                                                            <Col md={8} className="d-flex">
                                                                <div className="me-4">
                                                                    <p className="text-white text-sm opacity-8 mb-0">Card Holder</p>
                                                                    <h6 className="text-white mb-0">Vinayak Goswami</h6>
                                                                </div>
                                                                <div>
                                                                    <p className="text-white text-sm opacity-8 mb-0">Expires</p>
                                                                    <h6 className="text-white mb-0">11/24</h6>
                                                                </div>
                                                            </Col>
                                                            <Col md={4} className="ms-auto d-flex align-items-end justify-content-end">
                                                                <img className="w-20 mt-2" src={ mastercard } alt="logo" />
                                                            </Col>
                                                        </div>
                                                    </Card.Body>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col xl={6}>
                                            <Row>
                                                <Col md={6} class="col-md-6">
                                                    <Card>
                                                        <Card.Header className="mx-4 p-3 text-center">
                                                            <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                                                                <i className="fas fa-landmark opacity-10"></i>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body className="pt-0 p-3 text-center">
                                                            <h6 className="text-center mb-0">Salary</h6>
                                                            <span className="text-xs">Belong Interactive</span>
                                                            <hr className="horizontal dark my-3" />
                                                            <h5 className="mb-0">+$2000</h5>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={6} className="mt-md-0 mt-4">
                                                    <Card>
                                                        <Card.Header className="mx-4 p-3 text-center">
                                                            <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                                                                <i className="fab fa-paypal opacity-10"></i>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body className="pt-0 p-3 text-center">
                                                            <h6 className="text-center mb-0">Paypal</h6>
                                                            <span className="text-xs">Freelance Payment</span>
                                                            <hr className="horizontal dark my-3" />
                                                            <h5 className="mb-0">$455.00</h5>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Card className='bg-auto mb-3'>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col md={3}>
                                                <Form.Group controlId="search">
                                                    <Form.Label>Search</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={this.handleSearchChange}
                                                        placeholder="Search transactions"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="filterFrom">
                                                <Form.Label>From</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="from"
                                                        value={filters.from}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="filterTo">
                                                    <Form.Label>To</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="to"
                                                        value={filters.to}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="filterAmount">
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="amount"
                                                        value={filters.amount}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="filterDate">
                                                    <Form.Label>Date</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="date"
                                                        value={filters.date}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col md={2}>
                                                <Form.Group controlId="filterAction">
                                                    <Form.Label>Action</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="action"
                                                        value={filters.action}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="primary" onClick={() => this.handleSort('from')}>
                                                    Sort by From
                                                </Button>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="primary" onClick={() => this.handleSort('to')}>
                                                    Sort by To
                                                </Button>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="primary" onClick={() => this.handleSort('amount')}>
                                                    Sort by Amount
                                                </Button>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="primary" onClick={() => this.handleSort('date')}>
                                                    Sort by Date
                                                </Button>
                                            </Col>
                                            <Col md={2} className="d-flex align-items-end">
                                                <Button variant="primary" onClick={() => this.handleSort('action')}>
                                                    Sort by Action
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className='bg-auto mb-3'>
                                <Card.Body>
                                    <Row>
                                        <Col md={1}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">S. No.</p>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold" onClick={() => this.handleSort('from')}>From</p>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">To</p>
                                            </div>
                                        </Col>
                                        <Col md={1}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">Amount</p>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">Date</p>
                                            </div>
                                        </Col>
                                        <Col md={1}>
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-capitalize font-weight-bold">Action</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <ToolBar>
                                {currentItems.map((item, index) => (
                                    <Card key={index} className='bg-auto mb-3'>
                                        <Card.Body>
                                            <Row>
                                                <Col md={1}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.id}</p>
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.from}</p>
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.to}</p>
                                                    </div>
                                                </Col>
                                                <Col md={1}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.amount}</p>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.date}</p>
                                                    </div>
                                                </Col>
                                                <Col md={1}>
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{item.action}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </ToolBar>
                            
                            <br />
                            <Card className='bg-auto'>
                                <Card.Footer>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Form.Group controlId="itemsPerPage" className="mb-0 me-3">
                                            <Form.Label className="me-2 mb-0">Items per page</Form.Label>
                                            <Form.Control as="select" value={itemsPerPage} onChange={this.handleItemsPerPageChange}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <div className="pagination">
                                            {this.renderPagination(totalPages, currentPage)}
                                        </div>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                        <Footer />
                    </TopBar>
                </SideBar>
            </>
        );
    }
}
