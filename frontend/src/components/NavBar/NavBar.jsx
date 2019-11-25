import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import './NavBar.css';

function NavBar() {
  return (
    <Container>
      <Row>
        <Navbar expand="lg" variant="light" fixed="top">
          <Col xs={12} md={8} xs={8} className="logo">
            <Navbar.Brand>
              <Link to="/" className="logoTextLink">
                <div className="logoText">
                          s i n t e r
                </div>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col xs={6} md={4} xs={4}id="navbarLogout">
            <Navbar.Brand>
              <Link to="#logout" className="logoutLink">
                      Logout
              </Link>
             </Navbar.Brand>
          </Col>
        </Navbar>
      </Row>

    </Container>
  );
}

export default NavBar;
