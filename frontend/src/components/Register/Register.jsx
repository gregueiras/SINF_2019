import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { Redirect } from 'react-router-dom';

import '../Login/Login.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            redirect: false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onValidateRegister = this.onValidateRegister.bind(this);
        this.UserService = new UserService();
    }

    onChangeUsername(event) {
        const newUsername = event.target.value;
        this.setState({ username: newUsername });


    }
    onChangeEmail(event) {
        const newEmail = event.target.value;
        this.setState({ email: newEmail });


    }

    onChangePassword(event) {
        const newPassword = event.target.value;
        this.setState({ password: newPassword });

    }
    onChangeRepeatPassword(event) {
        const newPassword = event.target.value;
        this.setState({ repeatPassword: newPassword });

    }
    onValidateRegister() {
        console.log("state " + JSON.stringify(this.state));
        this.UserService.register({
            username: this.state.username, email: this.state.email, password: this.state.password,
            repeatPassword: this.state.repeatPassword
        }, (response) => {
            console.log(response);
            if (response.data.message === "Success")
                this.setState({ redirect: true });
            else console.log("failed");
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {

        return (
            <Container className="register-container">
                {this.renderRedirect()}

                <Form id="register-form">
                    <h3 className="register-title">Create Account </h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="username" onChange={this.onChangeUsername} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Email</Form.Label>
                        <Form.Control type="email" placeholder="email" onChange={this.onChangeEmail} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="password" placeholder="password" onChange={this.onChangePassword} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="password" onChange={this.onChangeRepeatPassword} required />
                    </Form.Group>
                    <Button className="blue-button login-button" variant="primary" onClick={this.onValidateRegister}>
                        Register
                    </Button>
                    <Form.Group>
                        <Form.Label className="signin-label">Already have an account? <Link className="signin-link" to="/login">Sign in</Link></Form.Label>
                    </Form.Group>

                </Form>


            </Container>



        );
    }

}

export default withRouter(Register);