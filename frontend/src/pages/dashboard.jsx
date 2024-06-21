import React, { Component } from 'react';
import axios from 'axios';

import './css/dashboard.css';

import csrftoken from './helper/crsf'; 
import TITLE from './info/title';
import Loader from './helper/loader';
import BACKENDURL from './info/backend';
import Footer from './helper/footer';
import SideBar from './helper/sidebar';
import TopBar from './helper/topbar';
import Testimonials from "./helper/testimonials";

import CryptoUtils from './helper/crypto';

const Page_TITLE = TITLE + ' - Dashboard';


export default class Dashboard extends Component {
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
            isLoading: true,
            error: null
        };
        this.isUserAuthorizedCalled = false;
    }

    componentDidMount() {
        if (!this.isUserAuthorizedCalled) {
            this.isUserAuthorizedCalled = true;
            this.isUserAuthorized();
        }

        document.title = Page_TITLE;
    }

    handleDecryption = (raw) => {
        const crypto = new CryptoUtils();
        const data = crypto.decrypt(raw);

        return { username: data["username"], profileimage: data["profileimage"] };
    }

    isUserAuthorized = () => {
        axios
            .post(
                BACKENDURL + '/api/dashboard/isauthorized/',
                {},
                { headers: { 'X-CSRFToken': csrftoken } }
            )
            .then((response) => {
                var success = response.data.success;
                
                if(success) {
                    const { username, profileimage } = this.handleDecryption(response.data.data);
                    this.setState({
                        user_data: {
                            "username": username,
                            "profileimage": profileimage
                        }
                    })
                }
                else {
                    this.setState({
                        error: response.data.error
                    });    
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({ 
                    error: false,
                    isLoading: false
                });
                console.log('Something unexpected happened. Error: ' + error);
            });
    };

    render() {
        const { user_data, isLoading, error } = this.state;

        if (isLoading) {
            return (
                <>
                    <Loader />
                </>
            );
        }

        if (error) {
            return (<div>{error}</div>);
        }

        return (
            <>
                <SideBar username={ user_data.username } profileimage={ user_data.profileimage }>
                    <TopBar page="Dashboard">
                        <Testimonials />
                        <Testimonials />
                        <Testimonials />
                        <Testimonials />
                        <Testimonials />
                        <Footer />
                    </TopBar>
                </SideBar>
            </>
        );
    }
}