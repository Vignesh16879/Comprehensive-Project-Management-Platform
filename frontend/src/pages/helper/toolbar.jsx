import React, { Component } from 'react';
import { Row, Col, Card, Form, Button, Image, InputGroup, FormControl } from 'react-bootstrap';

import './css/toolbar.css';


export default class ToolBar extends Component {
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
        const { children } = this.props;

        return (
            <>
                <div className='toolbar-container'>
                    <Card className='mb-3'>
                        <Card.Header>
                            <Form>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controloId="search">
                                            <Form.Control
                                                type="text"
                                                value={searchQuery}
                                                onChange={this.handleSearchChange}
                                                placeholder="Search transactions"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}></Col>
                                    <Col md={2}></Col>
                                    <Col md={2}>
                                        <Button>Add</Button>
                                    </Col>
                                    <Col md={2}>
                                        <Button>Remove</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={2}>
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Transaction Id</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Company</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Amount</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Date</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="numbers">
                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Remarks</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    { children }

                    <Card clasName='mb-3'>
                        <Card.Footer>
                            Page
                        </Card.Footer>
                    </Card>
                </div>
            </>
        );
    }
}