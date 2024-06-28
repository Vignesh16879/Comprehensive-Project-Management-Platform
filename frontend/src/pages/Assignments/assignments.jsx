import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';

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
import "./css/assignments.css";

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
                        <Footer />
                    </TopBar>
                </SideBar>
            </>
        );
    }
}