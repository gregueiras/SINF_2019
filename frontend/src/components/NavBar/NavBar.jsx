import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import './NavBar.css';

function NavBar(props) {
  
  const {disableLogout} = props;

  return (
    <Container>
      <Row>
        <Navbar expand="lg" variant="light" fixed="top">
          <Col md={8} xs={8} className="logo">
            <Navbar.Brand>
              <Link to="/" className="logoTextLink">
                <div className="logoText">
                          s i n t e r
                </div>
              </Link>
            </Navbar.Brand>
          </Col>
          <Col md={4} xs={4} id="navbarLogout">
            {!disableLogout && (
            <Navbar.Brand>
              <Link to="/login" className="logoutLink">
                      Logout
              </Link>
            </Navbar.Brand>
            )}
          </Col>
        </Navbar>
      </Row>

    </Container>
  );
}

export default NavBar;
