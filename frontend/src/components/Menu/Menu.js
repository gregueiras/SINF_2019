import React from 'react';
import './Menu.css';
import { Nav } from 'react-bootstrap';

function Menu(){

    return(

          <div id="appMenu">
            <Nav
              className="navigation"
              variant="pills"
              fill
              defaultActiveKey="link-2"
            >
              <Nav.Item className="navItem1">
                <Nav.Link
                  eventKey="link-1"
                  className="navLink1"
                  id="navText"
                >
                <p className="menuText">Overview</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  className="navLink2"
                  id="navText"
                >
               <p className="menuText"> Master Data</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-3"
                  className="navLink3"
                  id="navText"
                >
                <p className="menuText"> Logs</p>

                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-4"
                  className="navLink4"
                  id="navText"
                >
                <p className="menuText"> Settings</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>



    );
}

export default Menu;