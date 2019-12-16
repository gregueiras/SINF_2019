/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AlertDismissible from '../Alert/Alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
 


import './Settings.css';
import CompanyService from '../../services/CompanyService';

export class Settings extends Component {
  constructor() {
    super();

    this.state = {
      organizations: [],
      showMessage: false,
      showText: '',
      variantType: '',
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onUpdateCompany = this.onUpdateCompany.bind(this);
    this.onChangeClientId = this.onChangeClientId.bind(this);
    this.onChangeClientSecret = this.onChangeClientSecret.bind(this);
    this.onChangeTenant = this.onChangeTenant.bind(this);
    this.onDeleteCompany = this.onDeleteCompany.bind(this);
    this.onAddOrganization = this.onAddOrganization.bind(this);
    this.onCheckSuccess = this.onCheckSuccess.bind(this);

    this.CompanyService = new CompanyService();
  }

  componentDidMount() {
    this.CompanyService.getCompanies((response) => {
     if(response !== undefined){
      const reverse = response.data.slice().reverse();
      const companies = reverse.map((data) => (
        {
          id: data.id,
          name: data.name,
          organization: data.organization,
          tenant: data.tenant,
          clientId: data.clientId,
          clientSecret: data.clientSecret,
        }

      ));
      const newState = { organizations: companies };
      this.setState(newState);
     }
    });
  
  }

onClickDelete = idx => evt =>  {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to delete this company?',
    buttons: [
      {
        label: 'Yes',
        onClick: this.onDeleteCompany(idx),
      },
      {
        label: 'No',
        onClick: () =>  {}
      }
    ]
  });
};

onAddOrganization = () => {
    this.setState({
      organizations: this.state.organizations.concat([{ name: "", organization: "", tenant: "", clientId: "", clientSecret: "" }])
    });
  };

  onChangeCompanyName = idx => evt => {
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
  
  onDeleteCompany = idx => () => {
    console.log("delete company")
    let company;

    this.state.organizations.forEach((organization, sidx) => {
      if (idx === sidx)
        company = organization;
    })
   
    this.CompanyService.deleteCompany(company, (response) => {
      if (response.status === 200){
        this.setState({
          organizations: this.state.organizations.filter((s, sidx) => idx !== sidx),
          variantType:'success',
          showText: 'Company deleted with success!',
          showMessage:true,
        });

      } else{
        this.setState({
          organizations: this.state.organizations.filter((s, sidx) => idx !== sidx),
          variantType:'danger',
          showText: 'Something went wrong...',
          showMessage:true,
        });
      }
    });
    
  };

  onCheckSuccess(response){   
    let text, variant;

    if (response.status === 200){
      text = 'Changes saved with success!';
      variant = 'success';
    } else{
      text = 'Something went wrong...';
      variant = 'danger';
    }
    this.setState({showMessage:true, showText:text, variantType:variant});
  }

  onUpdateCompany = idx => () => {
    let company;
    this.state.organizations.forEach((organization, sidx) => {
      if (idx === sidx)
        company = organization;
    })
  
    if(company.id === undefined){
      this.CompanyService.addCompany(company, (response) => {
        this.onCheckSuccess(response);
     });
    }else{
      this.CompanyService.editCompany(company, (response) => { 
        this.onCheckSuccess(response);
    });
  }
  };

  render() {
    const { organizations, showMessage, showText, variantType } = this.state;

    return (
      <Container className="settingsContainer">
        <AlertDismissible variant={variantType} alertId='settingsAlert' show={showMessage} setShow={() => { this.setState({ showMessage: false }); }} text={showText} />

        <Form className="settingsForm">


          <Form.Group controlId="controlOrganizations" className="organizations">
            {organizations.map((organization, idx) => (

              <div className="organizationDiv" key={idx}>
                <Form.Row>
                  <Col>
                    <Form.Label className="gray-label">{`Company Name ${idx + 1}`}</Form.Label>
                    <Form.Control type="text"
                      placeholder={`Organization name ${idx + 1}`}
                      onChange={this.onChangeCompanyName(idx)}
                      value={organization.name} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col sm={6}>
                    <Form.Label className="gray-label">{`Organization ID `}</Form.Label>
                    <Form.Control type="text"
                      placeholder={`Organization id ${idx + 1}`}
                      onChange={this.onChangeOrganization(idx)}
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
                    <div className="submitIcons" >
                      <Button className="save-button blue-button" onClick={this.onUpdateCompany(idx)}>
                        <FontAwesomeIcon icon={faCheck} /> Save Changes
                    </Button>
                      <Button className="iconDelete blue-button" onClick={this.onClickDelete(idx)}>
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