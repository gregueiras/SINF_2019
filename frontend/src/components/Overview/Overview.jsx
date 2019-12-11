/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import ReactTable from 'react-table';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

import './Overview.css';
import setIcon from '../../Utilities/SetIcon';
import CompanyService from '../../services/CompanyService';
import LogService from '../../services/LogService';
class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
        companyAOptions: [],
        companyBOptions: [],
        companyA: '',
        companyB:''
    }
    this.CompanyService = new CompanyService();
    this.LogService = new LogService();

  }


  componentDidMount(){
    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAOptions: response.data,
        companyBOptions: reverse,
        companyA: response.data[0].id,
        companyB: reverse[0].id
      }, this.getLogs);
    });
  }

  getLogs(){
    this.LogService.getLogsBetween2Companies(this.state.companyA,
      this.state.companyB, (response)=>{
        console.log(response);
        this.setState({
          data: response.data
        })
      })
    }
  onChangeCompanyA = (event) => {
    event.preventDefault();
    this.setState({companyA: event.target.value },this.getLogs)
  }
  onChangeCompanyB = (event) => {
    event.preventDefault();
    this.setState({companyB: event.target.value}, this.getLogs);
  }


  render() {
    return (
      <Container>
        <Row>
          <Col md={4}>
            <Link
              className="addNewProcess blue-button gen-button plus-button rel-text-white"
              size="sm"
              to="/new-process"
            >
              <FontAwesomeIcon icon={faPlus} className="iconPlus mx-3" />
              Process
          </Link>
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
                {this.state.companyAOptions.map((e, key) => (
                  <option key={key} value={e.id}>
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
                {this.state.companyBOptions.map((e, key) => (
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
            data={this.state.data}
            columns={[
              {
                Header: 'Process',
                accessor: 'description',
              },
              {
                Header: 'State',
                accessor: 'state',
                Cell: (value) => setIcon(value, false),
                width: 150,
              },
              {
                Header: 'Timestamp',
                accessor: 'date',
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </Container>
    );
  }
}

export default withRouter(Overview);
