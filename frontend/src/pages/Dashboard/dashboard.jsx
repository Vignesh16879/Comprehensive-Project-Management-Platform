import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';

import './css/dashboard.css';

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


const Page_TITLE = WebsiteTITLE + ' - Dashboard';


export default class Dashboard extends Component {
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
            error: null
        };
        this.isUserAuthorizedCalled = false;
    }

    componentDidMount() {
        document.title = Page_TITLE;
    }

    render() {
        const { isLoading, user_data } = this.state;

        if(isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        return (
            <>
                <SideBar page="Dashboard" username={ user_data.username } profileimage={ user_data.profileimage }>
                    <TopBar page="Dashboard">
                        <div className='dashboard-container'>
                            <Row className='mb-3'>
                                <Col md={7}>
                                    <div class="card">
                                        <div class="card-header pb-0">
                                        <div class="row">
                                            <div class="col-lg-6 col-7">
                                            <h6>Projects</h6>
                                            <p class="text-sm mb-0">
                                                <i class="fa fa-check text-info" aria-hidden="true"></i>
                                                <span class="font-weight-bold ms-1">30 done</span> this month
                                            </p>
                                            </div>
                                            <div class="col-lg-6 col-5 my-auto text-end">
                                            <div class="dropdown float-lg-end pe-4">
                                                <a class="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa fa-ellipsis-v text-secondary"></i>
                                                </a>
                                                <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                                <li><a class="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="card-body px-0 pb-2">
                                        <div class="table-responsive">
                                            <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Companies</th>
                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Budget</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-xd.svg" class="avatar avatar-sm me-3" alt="xd" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Soft UI XD Version</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                        <img src="../assets/img/team-1.jpg" alt="team1" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                        <img src="../assets/img/team-2.jpg" alt="team2" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                                        <img src="../assets/img/team-3.jpg" alt="team3" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                        <img src="../assets/img/team-4.jpg" alt="team4" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> $14,000 </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">60%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-atlassian.svg" class="avatar avatar-sm me-3" alt="atlassian" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Add Progress Track</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                        <img src="../assets/img/team-2.jpg" alt="team5" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                        <img src="../assets/img/team-4.jpg" alt="team6" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> $3,000 </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">10%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-slack.svg" class="avatar avatar-sm me-3" alt="team7" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Fix Platform Errors</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                        <img src="../assets/img/team-3.jpg" alt="team8" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                        <img src="../assets/img/team-1.jpg" alt="team9" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> Not set </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">100%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm me-3" alt="spotify" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Launch our Mobile App</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                        <img src="../assets/img/team-4.jpg" alt="user1" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                                                        <img src="../assets/img/team-3.jpg" alt="user2" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                                                        <img src="../assets/img/team-4.jpg" alt="user3" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                        <img src="../assets/img/team-1.jpg" alt="user4" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> $20,500 </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">100%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-jira.svg" class="avatar avatar-sm me-3" alt="jira" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Add the New Pricing Page</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                        <img src="../assets/img/team-4.jpg" alt="user5" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> $500 </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">25%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="25"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-invision.svg" class="avatar avatar-sm me-3" alt="invision" />
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">Redesign New Online Shop</h6>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="avatar-group mt-2">
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                                        <img src="../assets/img/team-1.jpg" alt="user6" />
                                                    </a>
                                                    <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                                                        <img src="../assets/img/team-4.jpg" alt="user7" />
                                                    </a>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="text-xs font-weight-bold"> $2,000 </span>
                                                </td>
                                                <td class="align-middle">
                                                    <div class="progress-wrapper w-75 mx-auto">
                                                    <div class="progress-info">
                                                        <div class="progress-percentage">
                                                        <span class="text-xs font-weight-bold">40%</span>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="40"></div>
                                                    </div>
                                                    </div>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={5} class="mt-4">
                                    <div class="card h-100 mb-4">
                                        <div class="card-header pb-0 px-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                            <h6 class="mb-0">Your Transaction's</h6>
                                            </div>
                                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                            <i class="far fa-calendar-alt me-2"></i>
                                            <small>23 - 30 March 2020</small>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="card-body pt-4 p-3">
                                        <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Newest</h6>
                                        <ul class="list-group">
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-down"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">Netflix</h6>
                                                <span class="text-xs">27 March 2020, at 12:30 PM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-danger text-sm font-weight-bold">
                                                - $ 2,500
                                            </div>
                                            </li>
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">Apple</h6>
                                                <span class="text-xs">27 March 2020, at 04:30 AM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-success text-sm font-weight-bold">
                                                + $ 2,000
                                            </div>
                                            </li>
                                        </ul>
                                        <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">Yesterday</h6>
                                        <ul class="list-group">
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">Stripe</h6>
                                                <span class="text-xs">26 March 2020, at 13:45 PM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-success text-sm font-weight-bold">
                                                + $ 750
                                            </div>
                                            </li>
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">HubSpot</h6>
                                                <span class="text-xs">26 March 2020, at 12:30 PM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-success text-sm font-weight-bold">
                                                + $ 1,000
                                            </div>
                                            </li>
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">Creative Tim</h6>
                                                <span class="text-xs">26 March 2020, at 08:30 AM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-success text-sm font-weight-bold">
                                                + $ 2,500
                                            </div>
                                            </li>
                                            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-icon-only btn-rounded btn-outline-dark mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-exclamation"></i></button>
                                                <div class="d-flex flex-column">
                                                <h6 class="mb-1 text-dark text-sm">Webflow</h6>
                                                <span class="text-xs">26 March 2020, at 05:00 AM</span>
                                                </div>
                                            </div>
                                            <div class="d-flex align-items-center text-dark text-sm font-weight-bold">
                                                Pending
                                            </div>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Footer />
                    </TopBar>
                </SideBar>
            </>
        );
    }
}