import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default class Task extends Component {
  handleMarkAsDone = () => {
    alert('Task marked as done!');
  };

  handleDigitalSubmission = (e) => {
    e.preventDefault();
    alert('Digital submission received!');
  };

  render() {
    const { task } = {
      name: "X", project: "Alpha", img: "../images/logo.png", description: "fbwjbfqwjbfojqqwf", deadline: "23.03.2025"
    };

    return (
      <Container className="py-5">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="mb-4">
              <Card.Body>
                <Row className="mb-3">
                  <Col xs={3} className="text-center">
                    <img
                      src={task.img}
                      alt={task.name}
                      className="rounded-circle"
                      style={{ width: '100px', height: '100px' }}
                      fluid="true"
                    />
                  </Col>
                  <Col xs={9}>
                    <h2 className="mb-1">{task.name}</h2>
                    <p className="text-muted mb-1">{task.project}</p>
                    <p className="text-muted">
                      <i className="far fa-clock text-primary me-2" />
                      Deadline: {task.deadline}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>Description</h5>
                    <p>{task.description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      onClick={this.handleMarkAsDone}
                      className="me-3"
                    >
                      Mark as Done
                    </Button>
                    <Button
                      variant="primary"
                      onClick={this.handleDigitalSubmission}
                    >
                      Submit Digitally
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <h5>Submit Digital Work</h5>
                <Form onSubmit={this.handleDigitalSubmission}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload your work</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}