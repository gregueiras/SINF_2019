/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Container, Form, Row, Col, Button
} from 'react-bootstrap';
import ReactTable from 'react-table';
import axios from 'axios';


import { Link, Redirect } from 'react-router-dom';
import CompanyService from '../../services/CompanyService';
import ProcessTypeService from '../../services/ProcessTypeService';
import ProcessService from '../../services/ProcessService';

import './NewProcess.css';


class NewProcess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyAoptions: [],
      companyBoptions: [],
      processTypes: [],
      companyA: '',
      companyB: '',
      processType: '',
      companyAdescription: '',
      companyBdescription: '',
      tableData: [],
    };
    this.CompanyService = new CompanyService();
    this.ProcessTypeService = new ProcessTypeService();
    this.ProcessService = new ProcessService();

    this.addNewProcess = this.addNewProcess.bind(this);
  };



  componentDidMount() {

    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse,
        companyA: response.data[0].id,
        companyB: reverse[0].id,

        redirect: false
      })
    });
    this.ProcessTypeService.getProcessTypes((response) => {
      const reverse = response.data.slice().reverse();
      console.log("process type " + JSON.stringify(reverse));

      let compAdesc = [], compBdesc = [];

      response.data.forEach(element => {
        compAdesc.push(element.descriptionA);
        compBdesc.push(element.descriptionB);
      });

      this.setState({
        processTypes: response.data,
        processType: response.data[0].id,
        companyAdescription: compAdesc,
        companyBdescription: compBdesc,
        companyAdescIndex: 0,
        companyBdescIndex: 0,

      })
    
      console.log(response.data[0].id)
      axios.get(`http://localhost:3335/step/getByProcType/${response.data[0].id}`).then((response) =>{
        response.data.forEach(element =>{
          const {step_no, trigger_id, action_id, flow} = element;
          
          const newStep = {
            step: step_no,
            trigger: "hello",
            action: "action_id",
            flow: flow,
          };
          this.setState({tableData: [...this.state.tableData, newStep]}); 
        });
        console.log(this.state.tableData);
      })

    });

    
  }
  onChangeCompanyA = (event) => {
    event.preventDefault();
    this.setState({ companyA: parseInt(event.target.value) });
  }
  onChangeCompanyB = (event) => {
    event.preventDefault();
    this.setState({ companyB: parseInt(event.target.value) });
  }
  onChangeProcessType = (event) => {
    this.setState({tableData: []});  
    event.preventDefault();
    this.setState({ processType: parseInt(event.target.value) });
    this.setState({ companyAdescIndex: parseInt(event.target.value) - 1 });
    this.setState({ companyBdescIndex: parseInt(event.target.value) - 1 });


    axios.get(`http://localhost:3335/step/getByProcType/${this.state.processTypes[parseInt(event.target.value) - 1].id}`).then((response) =>{
      response.data.forEach(element =>{
        const {step_no, trigger_id, action_id, flow} = element;
        
        const newStep = {
          step: step_no,
          trigger: "hello",
          action: "action_id",
          flow: flow,
        };
        this.setState({tableData: [...this.state.tableData, newStep]}); 
      });
      console.log(this.state.tableData);
    })
  }

  addNewProcess() {

    this.ProcessService.addProcess({
      companyA: this.state.companyA, companyB: this.state.companyB, processType: this.state.processType
    }, (response) => {
      if (response.status === 200) {
        console.log(response.data);
        this.setState({ redirect: true });
      }
      else {
        console.log("failed");

      }
    });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    let processTypeId = 1;
    return (
      <Container>
        {this.renderRedirect()}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="gray-label">
                Type of Process
            </Form.Label>
              <select
                className="selector process-selector pos-lt rel-text-white w-20"
                name="typeOfProcess" onChange={this.onChangeProcessType}
              >
                {
                  this.state.processTypes.map((e, key) => (
                    <option key={key} value={processTypeId++}>
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
                {this.state.companyAdescription[this.state.companyAdescIndex]}
              </Form.Label>
              <select
                className="selector company-selector pos-lt rel-text-white"
                name="companyA" onChange={this.onChangeCompanyA}
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
                {this.state.companyBdescription[this.state.companyBdescIndex]}
              </Form.Label>
              <select
                className="selector company-selector pos-rt rel-text-white"
                name="companyB" onChange={this.onChangeCompanyB}
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

        <div className="reactTable">
        <ReactTable
          data={this.state.tableData}
          columns={[
            {
              Header: 'Step#',
              accessor: 'step',
            },
            {
              Header: 'Trigger',
              accessor: 'trigger',
            },
            {
              Header: 'Action',
              accessor: 'action',
            },
            {
              Header: 'Flow',
              accessor: 'flow',
            },

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
     

        <div className="mt-5 mb-5">
          <Button className="gray-button gen-button rel-text-blue mr-5 w-20" size="sm">
            <FontAwesomeIcon icon={faTimes} className="iconCheck" />
            Cancel
        </Button>
          <Button className="blue-button gen-button rel-text-white w-20" size="sm" type="submit" onClick={this.addNewProcess}>
            <FontAwesomeIcon icon={faCheck} className="iconCheck" />
            Confirm
        </Button>
        </div>

       
      </Container>
    );
  }
}

export default NewProcess;
