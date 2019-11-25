/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './Settings.css';

export class Settings extends Component {
constructor(){
super();

this.state={
  organizations:[{name: "Organization 1"}, {name: "Organization 2"}],
};


}

onAddOrganization = () => {
    this.setState({organizations: this.state.organizations.concat([{name :""}])
  });
};

onChangeOrganizationName = idx => evt =>{
  const newOrganizations = this.state.organizations.map((organization,sidx) => {
    if(idx !== sidx)
     return organization;
    return {...organization, name:evt.target.value};
  });
  this.setState({organizations: newOrganizations});
};

onDeleteOrganization = idx => () => {
  this.setState({organizations: this.state.organizations.filter((s,sidx) => idx !== sidx)
});
};

render() {

return(
<Container className="settingsContainer">

<Form className="settingsForm">

  <Form.Group controlId="controlTenant">
    <Form.Label className="gray-label">Tenant</Form.Label>
    <Form.Control type="text" placeholder="Tenant" />
  </Form.Group>
  
  <Form.Group controlId="controlOrganizations" className="organizations">
    { this.state.organizations.map((organization, idx) => (
      
      <div className="organizationDiv" key={idx}>
        <Form.Label className="gray-label">{`Organization ${idx+1}`}</Form.Label>
          <Form.Row>
            <Col sm={11}>
              <Form.Control type="text" 
                placeholder={`Organization ${idx+1}`}
                onChange={this.onChangeOrganizationName(idx)}
                value={organization.name} />
            </Col>
            <Col className="iconDelete">
              <Button className="blue-button" onClick={this.onDeleteOrganization(idx)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> 
              </Button>
            </Col>
          </Form.Row>
      <br />
      </div>
    ))}

  </Form.Group>
    <div className="settingsFormBtns">
        <Button className="blue-button" onClick={this.onAddOrganization}>
            <FontAwesomeIcon icon={faPlus} id="iconPlus" /> 
        </Button>
        <br/>
      <Link className="blue-button  gen-button rel-text-white w-20" size="sm" to="/#">
        <FontAwesomeIcon icon={faCheck} id="iconCheck" /> 
          Save Changes
      </Link>
    </div>
</Form>
</Container>
);

}
}

export default withRouter(Settings);