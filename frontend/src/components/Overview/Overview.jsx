/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import ReactTable from "react-table";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form } from "react-bootstrap";

import "./Overview.css";
import setIcon from "../../Utilities/SetIcon";
import CompanyService from "../../services/CompanyService";
import ProcessLogService from "../../services/ProcessLogService";
class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyAOptions: [],
      companyBOptions: [],
      companyA: "",
      companyB: ""
    };
    this.CompanyService = new CompanyService();
    this.ProcessLogService = new ProcessLogService();
  }

  // vou buscar todos os logs dos processos entre as 2 empresas
  //mostro os estado do ultimo log

  componentDidMount() {
    this.CompanyService.getCompanies(response => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAOptions: response.data,
        companyBOptions: reverse,
        companyA: response.data[0].id,
        companyB: reverse[0].id
      });
      this.getData(response.data[0].id, reverse[0].id);
    });
  }

  getData(companyA, companyB) {
    this.ProcessLogService.getOverviewProcessLogs(
      companyA,
      companyB,
      response => {
        if (response.status === 200) {
          this.setState({
            data: response.data.reverse()
          });
        }
      }
    );
  }

  onChangeCompanyA = event => {
    event.preventDefault();
    const { companyB } = this.state;
    this.setState({ companyA: event.target.value });
    this.getData(event.target.value, companyB);
  };
  onChangeCompanyB = event => {
    event.preventDefault();
    const { companyA } = this.state;
    this.setState({ companyB: event.target.value });
    this.getData(companyA, event.target.value);
  };

  render() {
    const { companyA, companyB } = this.state;
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
              <Form.Label className="gray-label">Company A</Form.Label>
              <select
                className="selector company-selector pos-lt rel-text-white"
                name="companyA"
                onChange={this.onChangeCompanyA}
              >
                {this.state.companyAOptions
                  .filter(e => e.id !== Number(companyB))
                  .map((e, key) => {
                    return (
                      <option key={key} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Group>
              <Form.Label className="gray-label">Company B</Form.Label>
              <select
                className="selector company-selector pos-rt rel-text-white"
                name="companyB"
                onChange={this.onChangeCompanyB}
              >
                {this.state.companyBOptions
                  .filter(e => e.id !== Number(companyA))
                  .map((e, key) => {
                    return (
                      <option key={key} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Col>
        </Row>
        <div className="reactTable">
          <ReactTable
            data={this.state.data}
            columns={[
              {
                Header: "Process",
                accessor: "overview_process",
                Cell: value => {
                  return (
                    <Link to={`/view-process/${value.original.id}`}>
                      {value.original.overview_process}
                    </Link>
                  );
                }
              },
              {
                Header: "State",
                accessor: "state",
                Cell: value => setIcon(value, false),
                width: 150
              },
              {
                Header: "Timestamp",
                accessor: "created_at"
              }
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
