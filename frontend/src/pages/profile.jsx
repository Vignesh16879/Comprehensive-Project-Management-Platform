import React, { Component } from 'react'
import './css/profile.css'


const TITLE = "DragonEyeX - Profile";


export default class Profile extends Component {
    componentDidMount() {
        document.title = TITLE;
    }

    render() {
        return (
            <div className='container'></div>
        )
    }
}