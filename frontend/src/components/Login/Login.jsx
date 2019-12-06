import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import  UserService  from '../../services/UserService';
import { Redirect } from 'react-router-dom';


import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            username: '',
            password: '',
            redirect: false
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onValidateLogin = this.onValidateLogin.bind(this);
        this.UserService = new UserService();
    }

    onChangeUsername(event){
        const newUsername = event.target.value;
        this.setState({username: newUsername});


    }

    onChangePassword(event){
        const newPassword = event.target.value;
        this.setState({password: newPassword});

    }
    onValidateLogin(event){
        event.preventDefault();
       console.log("state "+JSON.stringify(this.state));
        this.UserService.login({username: this.state.username,password: this.state.password}, (response)=> {
           if(response.data.message === "Success")
            this.setState({redirect: true});
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
            <Container className="login-container">
                {this.renderRedirect()}

                <Form id="loginForm" action="#">
                    <h3 className="login-title">Welcome back!</h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange= {this.onChangeUsername} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" onChange = {this.onChangePassword} required/>
                    </Form.Group>

                    <Button className="blue-button login-button" variant="primary" onClick={this.onValidateLogin} type="submit">
                        Login
                    </Button>
                    <Form.Group>
                        <Form.Label className="signup-label">Don't have an account? <Link className="signup-link" to="/register">Sign up</Link></Form.Label>
                    </Form.Group>

                </Form>


            </Container>



        );
    }

}

export default withRouter(Login);