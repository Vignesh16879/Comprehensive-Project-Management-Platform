import React, { Component } from 'react';
import { Container, Row, Col, Image, Tab, Tabs, Card } from 'react-bootstrap';

import logo from "../Images/logo.png";

import ProjectInfoView from './project_info_view';


export default class ProjectHostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectinfo: {
                "image" : logo,
                "description" : "fdsakgbjlkfdnagkbjrnfsjkangbr knba dsnm nbm,fkjbknm blkfbn maknvb rfd, b nfms ,mrenbaz ds v.ksd zO:SD, v<M ASN m, s bm, ",
                "objectives" : ["objectives1", "objective2"]
            }
        };
    }

    render() {
        const { projectinfo } = this.state;

        return (
            <>
                <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Project Info">
                        <div className='tag-container'>
                            <ProjectInfoView projectinfo={ projectinfo } />
                        </div>
                    </Tab>
                    <Tab eventKey="works" title="Works">
                        <div className='tag-container'>
                            Tab content for Works
                        </div>
                    </Tab>
                    <Tab eventKey="wormembersks" title="Members & Teams">
                        <div className='tag-container'>
                            Tab content for Members
                        </div>
                    </Tab>
                    <Tab eventKey="settings" title="Settings">
                        <div className='tag-container'>
                            Tab content for Settings
                        </div>
                    </Tab>
                    {/* <Tab eventKey="contact" title="Contact" disabled>
                        Tab content for Contact
                    </Tab> */}
                </Tabs>
            </>
        );
    }
}