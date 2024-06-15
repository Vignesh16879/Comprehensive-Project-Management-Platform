import React, { Component } from 'react'

// import './css/assignments.css'

import TITLE from "./info/title";
import TopNavbar from './helper/topnavbar';
import SideNavbar from './helper/sidenavbar';
import Footer from './helper/footer';

import profile_avatar from "./images/profile_avatar.png";


const Page_TITLE = TITLE + " - Assignments";
const username = "Vignesh Goswami";
const profileimage = profile_avatar;


export default class Assignments extends Component {
    componentDidMount() {
        document.title = Page_TITLE;
    }

    render() {
        return (
            <>
                <SideNavbar username={ username } profileimage={ profileimage }>
                    <div className='container'>
                        Assignments
                    </div>
                </SideNavbar>
            </>
        )
    }
}