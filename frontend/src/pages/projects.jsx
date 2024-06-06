import React, { Component } from 'react';

import './css/projects.css';
// import profile_avatar from "./images/profile_avatar.png";


const TITLE = "DragonEyeX - Projects";


export default class Projects extends Component {
    componentDidMount() {
        document.title = TITLE;
    }
    
    render() {
        return (
            <>
                <div></div>
            </>
        );
    }
}