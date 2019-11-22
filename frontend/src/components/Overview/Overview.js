import React, { useState } from "react";
import ReactTable from "react-table";
import { Redirect} from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";

import "./Overview.css"

function Overview() {
  const [data] = useState([
    {
      process: "Purchase Rugs - PP781763",
      state: "Completed",
      timestamp: "12/02/2019 19:01"
    },
    {
      process: "Purchase Rugs - PP781763",
      state: "Failed",
      timestamp: "12/02/2019 19:01"
    },
    {
      process: "Purchase Rugs - PP781763",
      state: "Pending",
      timestamp: "12/02/2019 19:01"
    },
    {
      process: "Purchase Rugs - PP781763",
      state: "In progress",
      timestamp: "12/02/2019 19:01"
    }
  ]);
  const [companyAoptions] = useState([
    { value: "1", name: "MetroCarpetDistributor" },
    { value: "2", name: "MetroCarpetFactory" },
    { value: "3", name: "option3" },
    { value: "4", name: "option4" }
  ]);
  const [companyBoptions] = useState([
    { value: "1", name: "MetroCarpetFactory" },
    { value: "2", name: "MetroCarpetDistributor" },
    { value: "3", name: "option3" },
    { value: "4", name: "option4" }
  ]);
  const [newProcess, setNewProcess] = useState(false);

  if(newProcess)
  return ( < Redirect to='/new-process' /> );

  return (
    <Container>
      <Row>
        <Col md={4}>
  
          <Button className="blue-button plus-button rel-text" size="sm"
           onClick={() => setNewProcess(true)}>
            + Process
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <select
            className="selector company-selector selector-lt rel-text"
            name="companyA"
          >
            {companyAoptions.map((e, key) => {
              return (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <select
            className="selector company-selector selector-rt rel-text"
            name="companyB"
          >
            {companyBoptions.map((e, key) => {
              return (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Process",
              accessor: "process"
            },
            {
              Header: "State",
              accessor: "state"
            },
            {
              Header: "Timestamp",
              accessor: "timestamp"
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

export default Overview;
