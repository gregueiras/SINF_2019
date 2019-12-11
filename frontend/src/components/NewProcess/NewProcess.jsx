/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Container, Form, Row, Col, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CompanyService from '../../services/CompanyService';
import ProcessTypeService from '../../services/ProcessTypeService';
import ProcessService from '../../services/ProcessService';

import './NewProcess.css';


class  NewProcess extends Component {

  constructor(props){
    super(props);
    this.state = {
      companyAoptions: [],
      companyBoptions: [],
      processTypes: [],
      companyA:'',
      companyB: '',
      processType:'',
    
    };
    this.CompanyService = new CompanyService();
    this.ProcessTypeService = new ProcessTypeService();
    this.ProcessService = new ProcessService();
    this.addNewProcess = this.addNewProcess.bind(this);
  }

  componentDidMount(){

    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse,
        companyA: response.data[0],
        companyB: reverse[0]

      })
    });
    this.ProcessTypeService.getProcessTypes((response)=> {
      const reverse = response.data.slice().reverse();
      console.log("process type "+ JSON.stringify(reverse));
    
      this.setState({
        processTypes: response.data,
        processType: response.data[0]
    })
    });
  }
  onChangeCompanyA = (event) => {
    event.preventDefault();
    this.setState({companyA: event.target.value });
  }
  onChangeCompanyB = (event) => {
    event.preventDefault();
    this.setState({companyB: event.target.value});
  }
  onChangeProcessType = (event) => {

    event.preventDefault();
    this.setState({processType: event.target.value});
  }

  addNewProcess(event){
    event.preventDefault();
    //console.log("state " + JSON.stringify(this.state));
    console.log(JSON.stringify(this.state.companyA)+" "+JSON.stringify(this.state.companyB));
    this.ProcessService.addProcess({
        companyA: this.state.companyA.id, companyB: this.state.companyB.id, processType: this.state.processType.id
    }, (response) => {
        console.log(response);
        if (response.status === 200)
        console.log("success");
           // this.setState({ redirect: true });
        else {
            console.log("failed");
           
        }
    });

  }

render(){
  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
              Type of Process
            </Form.Label>
            <select
              className="selector process-selector pos-lt rel-text-white w-20"
              name="typeOfProcess" onChange = {this.onChangeProcessType} 
            >
              {this.state.processTypes.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.type}
                </option>
              ))}
            </select>

            <Link className="blue-button gen-button plus-button-icon rel-text-white w-5" size="sm" to="/create-process-type">
              <FontAwesomeIcon icon={faPlus} className="iconPlus" />
            </Link>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="gray-label">
                Company A
            </Form.Label>
            <select
              className="selector company-selector pos-lt rel-text-white"
              name="companyA" onChange = {this.onChangeCompanyA}
            >
              {this.state.companyAoptions.map((e, key) => (
                <option key={key} value={e.id} >
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group>
            <Form.Label className="gray-label">
                Company B
            </Form.Label>
            <select
              className="selector company-selector pos-rt rel-text-white"
              name="companyB" onChange = {this.onChangeCompanyB}
            >
              {this.state.companyBoptions.map((e, key) => (
                <option key={key} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-5 mb-5">
        <Button className="gray-button gen-button rel-text-blue mr-5 w-20" size="sm" to="/">
          <FontAwesomeIcon icon={faTimes} className="iconCheck" />
          Cancel
        </Button>
        <Button className="blue-button gen-button rel-text-white w-20" size="sm" onClick={this.addNewProcess}>
          <FontAwesomeIcon icon={faCheck} className="iconCheck" />
          Confirm
        </Button>
      </div>
    </Container>
  );
}
}

export default NewProcess;
