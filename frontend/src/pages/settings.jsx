import React, { Component } from 'react'

// import './css/settings.css'

import TITLE from "./info/title";


const Page_TITLE = TITLE + " - Settings";


export default class Settings extends Component {
    componentDidMount() {
        document.title = Page_TITLE;
    }

    render() {
        return (
            <>
                <div></div>
            </>
        )
    }
}