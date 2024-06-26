import React, { Component, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import BasePage from '../Base';

import './style/projectdetails.css';

const p = {
  id: 1,
  title: 'Sample Project',
  creator: 'John Doe',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum erat odio, et pretium lorem interdum sed.',
  budget: '1000',
  status: 'In Progress',
  collaborators: ['Jane Smith', 'Alice Johnson'],
  creatorId: 'user123',
  tags: ['Web Development', 'React', 'JavaScript'],
  type: 'Web Application',
  framework: 'React',
  language: 'JavaScript',
  skillsRequired: ['Frontend Development', 'UI/UX Design'],
  expertise: 'Intermediate',
  duration: '2 months',
  image: './style/poj.jpg',
  progress: 69, // Example progress value
}

export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: p,
      userId: null,
      userName: null,
      roles: null,
    };
  }

  // componentDidMount() {
  //   const { userId, userName, roles } = this.context; 
  //   this.setState({ userId, userName, roles });
  // }

  handleJoinProject = () => {
    console.log('Joining project:', this.state.project.title);
  };

  handleEditProject = () => {
    console.log('Editing project:', this.state.project.title);
  };

  handleDeleteProject = () => {
    console.log('Deleting project:', this.state.project.title);
  };

  render() {
    const { project } = this.state;
    const { isLoggedIn } = true;
    const isCreator = true;
    // isLoggedIn && this.state.userId === project.creatorId;
    const isCollaborator = false;
    // isLoggedIn && project.collaborators.includes(this.state.userName);

    return (
      <BasePage toggleHeader={true} toggleSidebar={true} toggleFooter={false}>
        <section>
          <MDBContainer className="py-5">

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="./style/crea.jpg"
                      alt="img"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <h2 className="text-muted mb-1"><strong>{project.title}</strong></h2>
                    <p className="text-muted mb-1">{project.creator}</p>
                    <hr/>
                    <p className="text-muted mb-4">
                      {project.collaborators.map((c) => (
                        <span>{c}  </span>
                      ))}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      {isCreator && 
                        <>
                          <a href="#" onClick={this.handleEditProject} className="blue-button">Edit</a>
                          <a href="#" onClick={this.handleManageProject} className="blue-button">Manage</a>
                          <a href="#" onClick={this.handleDeleteProject} className="blue-button">Delete</a>
                        </>
                      }
                      {isCollaborator &&
                        <>
                          <a href="#" onClick={this.handleManageProject} className="blue-button">Manage</a>
                          <a href="#" onClick={this.handleContact} className="blue-button">Contact</a>
                        </>
                      }
                      {!isCollaborator && !isCreator &&
                        <>
                          <a href="#" onClick={this.handleManageProject} className="blue-button">Manage</a>
                          <a href="#" onClick={this.handleContact} className="blue-button">Contact</a>
                        </>
                      }
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>https://projectA.com</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                        <MDBCardText>projectA</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText>@projectA</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText>projectA</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText>projectA</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Description</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{project.description}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Budget</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{project.budget}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Duration</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{project.duration}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Expertise</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{project.expertise}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Type</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{project.type}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Progress</span> Project Status</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>UI Design</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Front-end</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Back-end</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>UX & Research</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Overall</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Tags</MDBCardText>
                        {project.tags.map((t, key) => (
                          <div className="tag" key={key}>{t}</div>
                        ))}
                        
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Framework</MDBCardText>
                          <div className="tag">{project.framework}</div>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Languages</MDBCardText>
                          <div className="tag">{project.language}</div>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Skills Required</MDBCardText>
                        {project.skillsRequired.map((s, key) => (
                          <div className="tag" key={key}>{s}</div>
                        ))}
                        
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </BasePage>
    );
  }
}