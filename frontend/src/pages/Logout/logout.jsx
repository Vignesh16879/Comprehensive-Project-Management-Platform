import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

import './css/logout.css';

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


const Page_TITLE = WebsiteTITLE + ' - Logout';


export default class Logout extends Component {
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
            isLoading: true,
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
                <div></div>
            </>
        );
    }
}