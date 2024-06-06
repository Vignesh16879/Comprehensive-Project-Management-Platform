import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import './css/register.css';

import profile_avatar from "./images/profile_avatar.png";

import WebsiteTitle from "./info/title";
import countryOptions from "./info/country";


const TITLE = WebsiteTitle + " - Register";


export default class Register extends Component {
    componentDidMount() {
        document.title = TITLE;
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
        document.querySelector('.step-1').style.display = 'block';
    }

    state = {
        currentStep: 1,
        recaptchaValue: null
    };

    displayStep = (stepNumber) => {
        const { currentStep } = this.state;
        if (stepNumber >= 1 && stepNumber <= 4) {
            document.querySelectorAll(".step-" + currentStep).forEach(step => {
                step.style.display = 'none';
            });
            document.querySelectorAll(".step-" + stepNumber).forEach(step => {
                step.style.display = 'block';
            });
            this.setState({ currentStep: stepNumber });
            this.updateProgressBar(stepNumber);
        }
    };

    updateProgressBar = (stepNumber) => {
        const progressPercentage = ((stepNumber - 1) / 3) * 100;
        document.querySelector(".progress-bar").style.width = progressPercentage + "%";
    };

    handleNextStep = () => {
        const { currentStep } = this.state;
        if (currentStep < 4) {
            this.displayStep(currentStep + 1);
        }
    };

    handlePrevStep = () => {
        const { currentStep } = this.state;
        if (currentStep > 1) {
            this.displayStep(currentStep - 1);
        }
    };

    render() {
        return (
            <>
                <div className="login-page">
                    <div className="container">
                        <Row>
                            <Col lg={12}>
                                <h3 className="mb-3">Register Now</h3>
                                <div className="shadow rounded">
                                    <Row>
                                        <Col md={7} className="pe-0">
                                            <div className="form-left h-100 py-5 px-5">
                                                <Form id="multi-step-form" action="" className="row g-4">
                                                    <div className="col-12">
                                                        <div className="progress px-1" style={{ height: '4px' }}>
                                                            <div className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>

                                                        <div className="step-container d-flex justify-content-between">
                                                            {[1, 2, 3, 4].map(step => (
                                                                <div key={step} className="step-circle" onClick={() => this.displayStep(step)}>{step}</div>
                                                            ))}
                                                        </div>

                                                        {/* Step 1 */}
                                                        <div className="step step-1">
                                                            <h3>Setup Account</h3>
                                                            <div className="mb-3">
                                                                <Row className="g-3">
                                                                    <Col md={6}>
                                                                        <Form.Label>First Name</Form.Label>
                                                                        <Form.Control name="f_name" type="text" placeholder='First Name'/>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Label>Last Name</Form.Label>
                                                                        <Form.Control name="l_name" type="text" placeholder='Last Name'/>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Label>D.O.B.</Form.Label>
                                                                        <Form.Control name="dob" type="date" placeholder="Date of Birth" />
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <Form.Label>Gender</Form.Label>
                                                                        <Form.Select name="gender" aria-label="Gender">
                                                                            <option disabled selected value>Select Gender</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                            <option value="other">Other</option>
                                                                            <option value="prefer_not_to_say">Prefer not to say</option>
                                                                        </Form.Select>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <Form.Label>Email</Form.Label>
                                                                        <Form.Control name="email" type="email" placeholder="Email" />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <Button variant="primary" className="px-4 mt-4 prev-step" href="/">Back</Button>
                                                            <Button variant="primary" className="px-4 float-end mt-4 next-step" onClick={this.handleNextStep}>Next</Button>
                                                        </div>

                                                        {/* Step 2 */}
                                                        <div className="step step-2">
                                                            <h3>Setup Address</h3>
                                                            <div className="mb-3 row g-3">
                                                                <Col md={6}>
                                                                    <Form.Label>Flat / House No., Apartment</Form.Label>
                                                                    <Form.Control name="address1" type="text" placeholder="Flat / House No., Apartment" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Label>Street, Landmark</Form.Label>
                                                                    <Form.Control name="address2" type="text" placeholder="Street, Landmark" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Label>State</Form.Label>
                                                                    <Form.Control name="state" type="text" placeholder="State" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Label>City</Form.Label>
                                                                    <Form.Control name="city" type="text" placeholder="City" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Label>Pin-code</Form.Label>
                                                                    <Form.Control name="pincode" type="text" placeholder="Pin-code" />
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Label>Country</Form.Label>
                                                                    <Form.Control as="select" name="country">
                                                                        <option disable selected value>Select Country</option>
                                                                        {countryOptions.map((country, index) => (
                                                                            <option key={index} value={country.name}>
                                                                                {country.name}
                                                                            </option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </Col>
                                                            </div>
                                                            <Button variant="primary" className="px-4 mt-4 prev-step" onClick={this.handlePrevStep}>Previous</Button>
                                                            <Button variant="primary" className="px-4 float-end mt-4 next-step" onClick={this.handleNextStep}>Next</Button>
                                                        </div>

                                                        {/* Step 3 */}
                                                        <div className="step step-3">
                                                            <h3>Security</h3>
                                                            <div className="mb-3">
                                                                <Col>
                                                                    <Form.Label>OTP (Send to your email)</Form.Label>
                                                                    <Form.Control name="otp" type="text" placeholder="" />
                                                                </Col>
                                                            </div>
                                                            <Button variant="primary" className="px-4 mt-4 prev-step" onClick={this.handlePrevStep}>Previous</Button>
                                                            <Button variant="primary" className="px-4 float-end mt-4 next-step" onClick={this.handleNextStep}>Next</Button>
                                                        </div>

                                                        {/* Step 4 */}
                                                        <div className="step step-4">
                                                            <h3>Confirmation</h3>
                                                            <div className="mb-3">
                                                                <p>Registration completed successfully!</p>
                                                                <div className="g-recaptcha" id="rcaptcha" data-sitekey="6LcgpRApAAAAAOPrH1LgyowKjtyMJqom4ZaZWIDJ"></div>
                                                                <span id="captcha" style={{ color: 'red' }}></span>
                                                            </div>
                                                            <Button variant="primary" className="px-4 mt-4 prev-step" onClick={this.handlePrevStep}>Previous</Button>
                                                            <Button type="submit" variant="primary" className="px-4 float-end mt-4">Register</Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Col>
                                        <Col md={5} className="ps-0 d-none d-md-block">
                                            <div className="form-right h-100 bg-primary text-white text-center pt-5">
                                                <i className="bi bi-bootstrap"></i>
                                                <h2 className="fs-1">Welcome to DragonEyeX!!!</h2>
                                                <img src={ profile_avatar } style={{ objectFit: 'contain' }} alt="Profile Avatar" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <p className="text-end text-secondary mt-3">By Vignesh Goswami</p>
                                <p className="text-end text-secondary mt-3">@{new Date().getFullYear()}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}