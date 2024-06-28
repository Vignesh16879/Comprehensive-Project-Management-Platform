import React, { Component } from 'react';
import { Container, Row, Col, Image, Tab, Tabs, Card } from 'react-bootstrap';


export default class ProjectInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { projectinfo } = this.props;

        return (
            <>
                <div>
                    <Row className='mb-3'>
                        <Card>
                            <Card.Header>
                                <b>Title</b>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Card.Img src={ projectinfo.image } />
                                    </Col>
                                    <Col md={8}>
                                        <Row>
                                            <Card className='mb-3'>
                                                <Card.Header>
                                                    <b>Description</b>
                                                </Card.Header>
                                                <Card.Body>
                                                    { projectinfo.description }
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                        <Row>
                                            <Card className='mb-3'>
                                                <Card.Header>
                                                    <b>Objectives:</b>
                                                    { 
                                                        projectinfo.objectives.map(
                                                            (objective, key) => (
                                                                <p>{ objective }</p>
                                                            )
                                                        )
                                                    }
                                                </Card.Header>
                                            </Card>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Header>
                                <b>Ongoing Works</b>
                            </Card.Header>
                            <Card.Body>
                                Something
                            </Card.Body>
                            <Card.Footer>
                                Last Updated 2 days ago.
                            </Card.Footer>
                        </Card>
                    </Row>
                </div>
            </>
        );
    }
}