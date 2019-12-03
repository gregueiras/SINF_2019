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
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername(event){
        const newUsername = event.target.value;
        this.setState({username: newUsername});


    }

    onChangePassword(event){
        const newPassword = event.target.value;
        this.setState({password: newPassword});



    }



    render() {

        return (
            <Container className="login-container">

                <Form id="loginForm">
                    <h3 className="login-title">Welcome back!</h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange= {this.onChangeUsername} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" onChange = {this.onChangePassword} />
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