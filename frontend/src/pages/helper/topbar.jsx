import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import "./css/topbar.css";


export default class TopBar extends Component {
    render() {
        const { page, children } = this.props;

        return (
            <>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-white" id="navbarBlur" data-scroll="true" data-color="light">
                        <div className="container-fluid py-1 px-3" data-color="light">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                    <li className="breadcrumb-item text-sm">
                                        <a className="opacity-5 text-dark" href="javascript:;">Pages</a>
                                    </li>
                                    <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{ page }</li>
                                </ol>
                                <h6 className="font-weight-bolder mb-0">{ page }</h6>
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                    <div className="input-group">
                                        <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" placeholder="Type here..." />
                                    </div>
                                </div>
                                <ul className="navbar-nav justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1"></i>
                                    <span className="d-sm-inline d-none">Sign In</span>
                                    </a>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                        <i className="sidenav-toggler-line"></i>
                                    </div>
                                    </a>
                                </li>
                                <li className="nav-item px-3 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0">
                                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                    <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-bell cursor-pointer"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                    <li className="mb-2">
                                        <a className="dropdown-item border-radius-md" href="javascript:;">
                                        <div className="d-flex py-1">
                                            <div className="my-auto">
                                            <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user_image" />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1">
                                                <span className="font-weight-bold">New message</span> from Laur
                                            </h6>
                                            <p className="text-xs text-secondary mb-0">
                                                <i className="fa fa-clock me-1"></i>
                                                13 minutes ago
                                            </p>
                                            </div>
                                        </div>
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a className="dropdown-item border-radius-md" href="javascript:;">
                                        <div className="d-flex py-1">
                                            <div className="my-auto">
                                            <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark me-3" alt="spotify_logo" />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1">
                                                <span className="font-weight-bold">New album</span> by Travis Scott
                                            </h6>
                                            <p className="text-xs text-secondary mb-0">
                                                <i className="fa fa-clock me-1"></i>
                                                1 day
                                            </p>
                                            </div>
                                        </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item border-radius-md" href="javascript:;">
                                        <div className="d-flex py-1">
                                            <div className="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <title>credit-card</title>
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                    <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(453.000000, 454.000000)">
                                                        <path className="color-background opacity-6" d="M43,10.7489375 L0,10.7489375 L0,3.583125 C0,1.6029375 1.6029375,0 3.583125,0 L39.416875,0 C41.3970625,0 43,1.6029375 43,3.583125 L43,10.7489375 Z"></path>
                                                        <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2301875 1.6029375,35.833125 3.583125,35.833125 L39.416875,35.833125 C41.3970625,35.833125 43,34.2301875 43,32.25 L43,16.125 L0,16.125 Z M12.54125,26.2498125 C12.54125,26.52125 12.3196875,26.7498125 12.04125,26.7498125 L7.708125,26.7498125 C7.4296875,26.7498125 7.208125,26.52125 7.208125,26.2498125 L7.208125,23.29125 C7.208125,23.0198125 7.4296875,22.79125 7.708125,22.79125 L12.04125,22.79125 C12.3196875,22.79125 12.54125,23.0198125 12.54125,23.29125 L12.54125,26.2498125 Z M17.416875,26.2498125 C17.416875,26.52125 17.1953125,26.7498125 16.916875,26.7498125 L12.58375,26.7498125 C12.3053125,26.7498125 12.08375,26.52125 12.08375,26.2498125 L12.08375,23.29125 C12.08375,23.0198125 12.3053125,22.79125 12.58375,22.79125 L16.916875,22.79125 C17.1953125,22.79125 17.416875,23.0198125 17.416875,23.29125 L17.416875,26.2498125 Z M27.54125,26.2498125 C27.54125,26.52125 27.3196875,26.7498125 27.04125,26.7498125 L22.708125,26.7498125 C22.4296875,26.7498125 22.208125,26.52125 22.208125,26.2498125 L22.208125,23.29125 C22.208125,23.0198125 22.4296875,22.79125 22.708125,22.79125 L27.04125,22.79125 C27.3196875,22.79125 27.54125,23.0198125 27.54125,23.29125 L27.54125,26.2498125 Z M32.58375,26.7498125 L28.25,26.7498125 C27.9715625,26.7498125 27.75,26.52125 27.75,26.2498125 L27.75,23.29125 C27.75,23.0198125 27.9715625,22.79125 28.25,22.79125 L32.58375,22.79125 C32.8621875,22.79125 33.08375,23.0198125 33.08375,23.29125 L33.08375,26.2498125 C33.08375,26.52125 32.8621875,26.7498125 32.58375,26.7498125 Z M38.375,26.7498125 L34.04125,26.7498125 C33.7628125,26.7498125 33.54125,26.52125 33.54125,26.2498125 L33.54125,23.29125 C33.54125,23.0198125 33.7628125,22.79125 34.04125,22.79125 L38.375,22.79125 C38.6534375,22.79125 38.875,23.0198125 38.875,23.29125 L38.875,26.2498125 C38.875,26.52125 38.6534375,26.7498125 38.375,26.7498125 Z"></path>
                                                    </g>
                                                    </g>
                                                </g>
                                                </g>
                                            </svg>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1">
                                                Payment successfully completed
                                            </h6>
                                            <p className="text-xs text-secondary mb-0">
                                                <i className="fa fa-clock me-1"></i>
                                                2 days
                                            </p>
                                            </div>
                                        </div>
                                        </a>
                                    </li>
                                    </ul>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                        { children }
                    </div>
                </main>
            </>
        );
    }
}