import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';

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
import ProjectHostView from './project_host_view';

import './css/project.css';


const Page_TITLE = WebsiteTITLE + ' - Project';


export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            todoList: [],
            modal: false,
            activeItem: {},
            isHost: true,
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
        const { isLoading, isHost, user_data } = this.state;

        if(isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        if(isHost) {
            return (
                <>
                    <SideBar page="Manage Projects" username={ user_data.username } profileimage={ user_data.profileimage }>
                        <TopBar page="Project">
                            <div className='project-container'>
                                <ProjectHostView />
                            </div>
                        </TopBar>
                    </SideBar>
                </>
            );
        }
        else {
            return (
                <>
                    <SideBar page="Projects" username={ user_data.username } profileimage={ user_data.profileimage }>
                        <TopBar page="Project">
                            <div className='project-container'>
                                <ProjectHostView />
                            </div>
                        </TopBar>
                    </SideBar>
                </>
            );
        }
    }
}