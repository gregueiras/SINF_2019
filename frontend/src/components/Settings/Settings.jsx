/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './Settings.css';
import CompanyService from '../../services/CompanyService';

export class Settings extends Component {
  constructor() {
    super();

    this.state = {
      organizations: [],
    };

    this.CompanyService = new CompanyService();

  }

  componentDidMount() {
    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      const companies = reverse.map((data) => (
        {
          name: data.name,
          organization: data.organization,
          tenant: data.tenant,
          clientId: data.clientId,
          clientSecret: data.clientSecret,
        }

      ));
      this.state.organizations = companies;
      this.setState(this.state);
    });
  }

  onAddOrganization = () => {
    this.setState({
      organizations: this.state.organizations.concat([{ name: "", organization: "", tenant: "", clientId: "", clientSecret: "" }])
    });
  };

  onChangeOrganizationName = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization, sidx) => {
      if (idx !== sidx)
        return organization;
      return { ...organization, name: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };

  onChangeOrganization = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization1, sidx) => {
      if (idx !== sidx)
        return organization1;
      return { ...organization1, organization: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };
  onChangeTenant = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization, sidx) => {
      if (idx !== sidx)
        return organization;
      return { ...organization, tenant: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };
  onChangeTenant = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization, sidx) => {
      if (idx !== sidx)
        return organization;
      return { ...organization, tenant: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };
  onChangeClientId = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization, sidx) => {
      if (idx !== sidx)
        return organization;
      return { ...organization, clientId: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };
  onChangeClientSecret = idx => evt => {
    const newOrganizations = this.state.organizations.map((organization, sidx) => {
      if (idx !== sidx)
        return organization;
      return { ...organization, clientSecret: evt.target.value };
    });
    this.setState({ organizations: newOrganizations });
  };

  onDeleteOrganization = idx => () => {
    this.setState({
      organizations: this.state.organizations.filter((s, sidx) => idx !== sidx)
    });
  };


  render() {


    return (
      <Container className="settingsContainer">

        <Form className="settingsForm">


          <Form.Group controlId="controlOrganizations" className="organizations">
            {this.state.organizations.map((organization, idx) => (

              <div className="organizationDiv" key={idx}>
                <Form.Row>
                  <Col>
                    <Form.Label className="gray-label">{`Company Name ${idx + 1}`}</Form.Label>
                    <Form.Control type="text"
                      placeholder={`Organization name ${idx + 1}`}
                      onChange={this.onChangeOrganizationName(idx)}
                      value={organization.name} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col sm={6}>
                    <Form.Label className="gray-label">{`Organization ID `}</Form.Label>
                    <Form.Control type="text"
                      placeholder={`Organization id ${idx + 1}`}
                      onChange={this.onChangeOrganizationName(idx)}
                      value={organization.organization} />
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="gray-label">Tenant</Form.Label>
                    <Form.Control type="text" placeholder="Tenant"
                      onChange={this.onChangeTenant(idx)}
                      value={organization.tenant} />

                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col sm={6}>
                    <Form.Label className="gray-label">Client ID</Form.Label>
                    <Form.Control type="text" placeholder="Client ID"
                      onChange={this.onChangeClientId(idx)}
                      value={organization.clientId} />
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="gray-label">Client Secret</Form.Label>
                    <Form.Control type="text" placeholder="Client Secret"
                      onChange={this.onChangeClientSecret(idx)}
                      value={organization.clientSecret} />
                  </Col>
                  <Col >
                    <div className="iconDelete" >
                    <Button className="save-button blue-button">
                      <FontAwesomeIcon icon={faCheck} /> Save Changes
                    </Button>
                    <Button className="blue-button" onClick={this.onDeleteOrganization(idx)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    
                    </div>
                  </Col>
                </Form.Row>
                <br />
              </div>

            ))}

          </Form.Group>
          <div className="settingsFormBtns">
            <Button className="blue-button" onClick={this.onAddOrganization}>
              <FontAwesomeIcon icon={faPlus} className="iconPlus" />
            </Button>

          </div>
        </Form>
      </Container>
    );

  }
}

export default withRouter(Settings);