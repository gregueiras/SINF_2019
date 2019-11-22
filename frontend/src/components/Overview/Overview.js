import React, { useState } from "react";
import ReactTable from "react-table";
import { Container, Row, Col, Button } from "react-bootstrap";

import "react-table/react-table.css";

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

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Button className="plus-button" size="sm">
            + Process
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <select
            className="company-selector company-selector-lt"
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
            className="company-selector company-selector-rt"
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
