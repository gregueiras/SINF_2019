import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import '../Login/Login.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }



    render() {

        return (
            <Container className="register-container">

                <Form id="register-form">
                    <h3 className="register-title">Create Account </h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="text" placeholder="password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Confirm Password</Form.Label>
                        <Form.Control type="text" placeholder="password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Tenant ID</Form.Label>
                        <Form.Control type="text" placeholder="tenant id" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Token</Form.Label>
                        <Form.Control type="text" placeholder="token" />
                    </Form.Group>
                    <Button className="blue-button login-button" variant="primary" type="submit">
                        Register
                    </Button>
                    <Form.Group>
                        <Form.Label className="signin-label">Already have an account? <Link className="signin-link">Sign in</Link></Form.Label>
                    </Form.Group>

                </Form>


            </Container>



        );
    }

}

export default withRouter(Register);