import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

import './css/settings.css';

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
import ToolBar from '../helper/toolbar';


const Page_TITLE = WebsiteTITLE + ' - Settings';


export default class Settings extends Component {
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
                <SideBar page="Settings" username={ user_data.username } profileimage={ user_data.profileimage }>
                    <TopBar page="Settings">
                      <ToolBar>
                        
                      </ToolBar>
                    </TopBar>
                </SideBar>
            </>
        );
    }
}