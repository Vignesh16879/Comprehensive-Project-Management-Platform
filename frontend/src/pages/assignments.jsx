import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

import './css/dashboard.css';

import csrftoken from './helper/crsf'; 
import WebsiteTITLE from './info/title';
import Loader from './helper/loader';
import BACKENDURL from './info/backend';
import Footer from './helper/footer';
import SideBar from './helper/sidebar';
import TopBar from './helper/topbar';


const Page_TITLE = WebsiteTITLE + ' - Assignments';


export default class Assignments extends Component {
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
                <SideBar page="Assignments" username={ user_data.username } profileimage={ user_data.profileimage }>
                    <TopBar page="Assingments">
                        Assignments
                    </TopBar>
                </SideBar>
            </>
        );
    }
}