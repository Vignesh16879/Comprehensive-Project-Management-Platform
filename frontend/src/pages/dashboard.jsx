import React, { Component } from 'react'
import './css/dashboard.css'


const TITLE = "DragonEyeX - Dashboard";


export default class Dashboard extends Component {
    componentDidMount() {
        document.title = TITLE;
    }

    render() {
        return (
            <div className='container'></div>
        )
    }
}