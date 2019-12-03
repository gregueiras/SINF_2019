import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }



    render() {

        return (
            <Container className="loginContainer">

                <Form id="loginForm">
                    <h3 className="login-title">Welcome back!</h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>

                    <Button className="blue-button login-button" variant="primary" type="submit">
                        Login
                    </Button>
                    <Form.Group>
                        <Form.Label className="signup-label">Don't have an account? <Link className="signup-link">Sign up</Link></Form.Label>
                    </Form.Group>

                </Form>


            </Container>



        );
    }

}

export default withRouter(Login);