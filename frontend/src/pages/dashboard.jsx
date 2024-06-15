import React, { Component } from 'react';
import axios from 'axios';

import './css/dashboard.css';

import csrftoken from './helper/crsf'; 
import TITLE from './info/title';
import BACKENDURL from './info/backend';
import TopNavbar from './helper/topnavbar';
import SideNavbar from './helper/sidenavbar';
import Footer from './helper/footer';

import profile_avatar from './images/profile_avatar.png';


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
    }

    componentDidMount() {
        this.isUserAuthorized();
        document.title = Page_TITLE;
    }

    isUserAuthorized = () => {
        axios
            .post(
                BACKENDURL + '/api/dashboard/isauthorized/',
                {},
                { headers: { 'X-CSRFToken': csrftoken } }
            )
            .then((response) => {
                const { username, profileimage } = response.data.data;
                this.setState({
                    isLoading: false,
                    user_data: { username, profileimage }
                });
                console.log(profileimage);
            })
            .catch((error) => {
                this.setState({ 
                    error: true,
                    isLoading: false
                });
                console.log('Something unexpected happened. Error: ' + error);
            });
    };

    render() {
        const { user_data, isLoading, error } = this.state;

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        if (error) {
            return (<div>{error}</div>);
        }

        return (
            <>
                <SideNavbar username={ user_data.username } profileimage={ user_data.profileimage }>
                    <div className='container'>
                        Dashboard
                    </div>
                    <Footer />
                </SideNavbar>
            </>
        );
    }
}
