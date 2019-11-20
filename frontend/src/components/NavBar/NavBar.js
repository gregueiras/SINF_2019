import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import './NavBar.css';

function NavBar(){

return(
    <Container>
        <Row>
        <Navbar expand="lg" variant="light" fixed="top">
            <Col sm={8}>
                <div className="logoText"> s i n t e r</div>       
            </Col>
            <Col sm={4} id="navbarLogout">
                <Link to="#logout" className="logoutLink">
                    Logout 
                </Link>
            </Col>
            </Navbar>
        </Row>
   
    </Container>
);
}

export default NavBar;