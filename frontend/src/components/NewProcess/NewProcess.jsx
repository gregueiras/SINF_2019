/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactTable from "react-table";
import { Link, Redirect } from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import ProcessTypeService from "../../services/ProcessTypeService";
import ProcessService from "../../services/ProcessService";
import AlertDismissible from "../Alert/Alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./NewProcess.css";

function compareSteps(a, b) {
  if (a.step_no < b.step_no) {
    return -1;
  }
  if (a.step_no > b.step_no) {
    return 1;
  }
  return 0;
}

class NewProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyAoptions: [],
      companyBoptions: [],
      processTypes: [],
      companyA: "",
      companyB: "",
      processType: "",
      companyAdescription: "",
      companyBdescription: "",
      tableData: [],

      showMessage: false,
      showText: "",
      variantType: ""
    };
    this.CompanyService = new CompanyService();
    this.ProcessTypeService = new ProcessTypeService();
    this.ProcessService = new ProcessService();

    this.addNewProcess = this.addNewProcess.bind(this);
    this.onChangeCompanyA = this.onChangeCompanyA.bind(this);
    this.onChangeCompanyB = this.onChangeCompanyB.bind(this);
    this.onChangeProcessType = this.onChangeProcessType.bind(this);
    this.onChangeRedirect = this.onChangeRedirect.bind(this);
  }

  changeSteps(index) {
    this.ProcessTypeService.getProcessTypeSteps(index, response => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({ tableData: data.steps.sort(compareSteps) });
      }
    });
  }

  componentDidMount() {
    this.CompanyService.getCompanies(response => {
      const reverse = response.data.slice().reverse();
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse,
        companyA: response.data[0].id,
        companyB: reverse[0].id,

        redirect: false
      });
    });
    this.ProcessTypeService.getProcessTypes(response => {
      if (response.status === 200) {

        let compAdesc = [],
          compBdesc = [];

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
          companyBdescIndex: 0
        });

        this.changeSteps(1);
      }
    });
  }
  onChangeCompanyA = event => {
    event.preventDefault();
    this.setState({ companyA: parseInt(event.target.value) });
  };
  onChangeCompanyB = event => {
    event.preventDefault();
    this.setState({ companyB: parseInt(event.target.value) });
  };
  onChangeProcessType = event => {
    this.setState({ tableData: [] });
    event.preventDefault();
    this.setState({ processType: parseInt(event.target.value) });
    this.setState({ companyAdescIndex: parseInt(event.target.value) - 1 });
    this.setState({ companyBdescIndex: parseInt(event.target.value) - 1 });

    this.changeSteps(parseInt(event.target.value));
  };

  addNewProcess() {
    this.ProcessService.addProcess(
      {
        companyB: this.state.companyA,
        companyA: this.state.companyB,
        processType: this.state.processType
      },
      response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({ redirect: true });
        } else {
          console.log("failed");
          this.setState({
            showMessage: true,
            variantType: "danger",
            showText: "Error while creating a new Process..."
          });
        }
      }
    );
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  onChangeRedirect = () => {
    this.setState({ redirect: true });
    this.renderRedirect();
  };

  render() {
    let processTypeId = 1;
    const {
      showMessage,
      showText,
      variantType,
      companyB,
      companyA
    } = this.state;
    return (
      <Container>
        <AlertDismissible
          variant={variantType}
          alertId="settingsAlert"
          show={showMessage}
          setShow={() => {
            this.setState({ showMessage: false });
          }}
          text={showText}
        />
        {this.renderRedirect()}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="gray-label">Type of Process</Form.Label>
              <select
                className="selector process-selector pos-lt rel-text-white w-20"
                name="typeOfProcess"
                onChange={this.onChangeProcessType}
              >
                {this.state.processTypes.map((e, key) => (
                  <option key={key} value={processTypeId++}>
                    {e.type}
                  </option>
                ))}
              </select>

              <Link
                className="add-button blue-button gen-button plus-button-icon rel-text-white w-5"
                size="sm"
                to="/create-process-type"
              >
                <FontAwesomeIcon icon={faPlus} className="iconPlus" />
              </Link>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="gray-label">{"Supplier (B)"}</Form.Label>
              <select
                className="selector company-selector pos-lt rel-text-white"
                name="companyA"
                onChange={this.onChangeCompanyA}
              >
                {this.state.companyAoptions
                  .filter(e => e.id !== companyB)
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
              <Form.Label className="gray-label">{"Customer (A)"}</Form.Label>
              <select
                className="selector company-selector pos-rt rel-text-white"
                name="companyB"
                onChange={this.onChangeCompanyB}
              >
                {this.state.companyBoptions
                  .filter(e => e.id !== companyA)
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
            data={this.state.tableData}
            columns={[
              {
                Header: "Step#",
                accessor: "step_no"
              },
              {
                Header: "Trigger",
                accessor: "trigger_description"
              },
              {
                Header: "Action",
                accessor: "action_description"
              },
              {
                Header: "Flow",
                accessor: "flow"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>

        <div className="pos-rt mb-5">
          <Button
            className="gray-button gen-button rel-text-blue mr-5"
            size="sm"
            onClick={this.onChangeRedirect}
          >
            <FontAwesomeIcon icon={faTimes} className="iconCheck" />
            Cancel
          </Button>
          <Button
            className="blue-button gen-button rel-text-white"
            size="sm"
            type="submit"
            onClick={this.addNewProcess}
          >
            <FontAwesomeIcon icon={faCheck} className="iconCheck" />
            Confirm
          </Button>
        </div>
      </Container>
    );
  }
}

export default NewProcess;
