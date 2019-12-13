import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import  UserService  from '../../services/UserService';
import AlertDismissible from '../Alert/Alert';
import { Redirect } from 'react-router-dom';


import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            username: '',
            password: '',
            redirect: false,
            showMessage: false,
            showText: '',
            variantType:'',
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
        this.UserService.login({username: this.state.username,password: this.state.password}, (response)=> {
           
           if(response.status === 200)
           this.setState({redirect: true});
            else {
                console.log("failed");
                const text = 'Login failed, username or password invalid.'
                this.setState({variantType:'danger', showText:text, showMessage:true});
            }
        });
    }



    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
    render() {

        const {showMessage,showText,variantType} = this.state;
        return (
            <Container className="login-container">
                {this.renderRedirect()}
                <AlertDismissible variant={variantType} alertId='settingsAlert' show={showMessage} setShow={() => { this.setState({ showMessage: false }); }} text={showText} />

                <Form id="loginForm" action="#">
                    <h3 className="login-title">Welcome back!</h3>
                    <Form.Group>
                        <Form.Label className="gray-label">Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange= {this.onChangeUsername} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="gray-label">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange = {this.onChangePassword} required/>
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