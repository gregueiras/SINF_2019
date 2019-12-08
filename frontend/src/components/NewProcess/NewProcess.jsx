/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Container, Form, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CompanyService from '../../services/CompanyService';
import ProcessTypeService from '../../services/ProcessTypeService';

import './NewProcess.css';


class  NewProcess extends Component {

  constructor(props){
    super(props);
    this.state = {
      companyAoptions: [],
      companyBoptions: [],
      processType: [],
    };
    this.CompanyService = new CompanyService();
    this.ProcessTypeService = new ProcessTypeService();
  }

  componentDidMount(){

    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse

      })
    });
    this.ProcessTypeService.getProcessTypes((response)=> {
      const reverse = response.data.slice().reverse();
      console.log("process type "+ JSON.stringify(reverse));
    
      this.setState({
        processType: response.data
    })
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
              name="companyA"
            >
              {this.state.processType.map((e, key) => (
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
              name="companyA"
            >
              {this.state.companyAoptions.map((e, key) => (
                <option key={key} value={e.value}>
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
              name="companyB"
            >
              {this.state.companyBoptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-5 mb-5">
        <Link className="gray-button gen-button rel-text-blue mr-5 w-20" size="sm" to="/">
          <FontAwesomeIcon icon={faTimes} className="iconCheck" />
          Cancel
        </Link>
        <Link className="blue-button gen-button rel-text-white w-20" size="sm" to="/">
          <FontAwesomeIcon icon={faCheck} className="iconCheck" />
          Confirm
        </Link>
      </div>
    </Container>
  );
}
}

export default NewProcess;
