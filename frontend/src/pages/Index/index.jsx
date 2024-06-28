// Imports
import React, { Component } from 'react';

// CSS
import './css/index.css';

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
import Slider from '../helper/slider';
import AboutUs from '../helper/aboutus';
import Testimonials from '../helper/testimonials';

// Images
import image01 from "../Images/image01.jpg";
import image02 from "../Images/image02.jpg";
import image03 from "../Images/image03.jpg";
import image04 from "../Images/image04.jpg";
import image05 from "../Images/image05.jpg";
import image06 from "../Images/image06.jpg";
import image07 from "../Images/image07.jpg";
import image08 from "../Images/image08.jpg";
import image09 from "../Images/image09.jpg";
import image10 from "../Images/image10.jpg";
import image11 from "../Images/image11.jpg";
import image12 from "../Images/image12.jpg";
import image13 from "../Images/image13.jpg";
import image14 from "../Images/image14.jpg";
import image15 from "../Images/image15.jpg";


const sliderImages = {
    [image01] : [<h2>Slide-01</h2>, <h2>Label-01</h2>, <p>Text-01</p>],
    [image02] : [<h2>Slide-02</h2>, <h2>Label-02</h2>, <p>Text-02</p>],
    [image03] : [<h2>Slide-03</h2>, <h2>Label-03</h2>, <p>Text-03</p>],
    [image04] : [<h2>Slide-04</h2>, <h2>Label-04</h2>, <p>Text-04</p>],
    [image05] : [<h2>Slide-05</h2>, <h2>Label-05</h2>, <p>Text-05</p>],
    [image06] : [<h2>Slide-06</h2>, <h2>Label-06</h2>, <p>Text-06</p>],
    [image07] : [<h2>Slide-07</h2>, <h2>Label-07</h2>, <p>Text-07</p>],
    [image08] : [<h2>Slide-08</h2>, <h2>Label-08</h2>, <p>Text-08</p>],
    [image09] : [<h2>Slide-09</h2>, <h2>Label-09</h2>, <p>Text-09</p>],
    [image10] : [<h2>Slide-10</h2>, <h2>Label-10</h2>, <p>Text-10</p>],
    [image11] : [<h2>Slide-11</h2>, <h2>Label-11</h2>, <p>Text-11</p>],
    [image12] : [<h2>Slide-12</h2>, <h2>Label-12</h2>, <p>Text-12</p>],
    [image13] : [<h2>Slide-13</h2>, <h2>Label-13</h2>, <p>Text-13</p>],
    [image14] : [<h2>Slide-14</h2>, <h2>Label-14</h2>, <p>Text-14</p>],
    [image15] : [<h2>Slide-15</h2>, <h2>Label-15</h2>, <p>Text-15</p>]
};

const Page_TITLE = WebsiteTITLE;


export default class Index extends Component {
    componentDidMount() {
        document.title = Page_TITLE;
    }

    render() {
        return (
            <>
                <TopNavbar />
                <Slider slides = { sliderImages } />
                <AboutUs />
                <Testimonials />
                <Footer />
            </>
        )
    }
}