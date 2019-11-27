import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Menu({ active }) {
  return (
    <div id="appMenu">
      <Nav
        className="navigation"
        variant="pills"
        fill
        defaultActiveKey={active}
      >
        <Nav.Item className="navItem1">
          <LinkContainer className="menuText" to="/"exact={true}>
            <Nav.Link eventKey="overview" className="navLink1" id="navText">
              Overview
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/master-data" className="menuText">
            <Nav.Link eventKey="master-data" className="navLink2" id="navText">
              Master Data
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/logs" className="menuText">
            <Nav.Link eventKey="logs" className="navLink3" id="navText">
              Logs
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/settings" className="menuText">
            <Nav.Link eventKey="settings" className="navLink4" id="navText">
              Settings
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </div>
  );
}

Menu.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Menu;
