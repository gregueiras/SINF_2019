import React, { useState } from "react";
import ReactTable from "react-table";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import "./NewProcess.css"

function NewProcess() {
  const [data, setData] = useState([
    {
      select: "Purchase Rugs - PP781763",
      id: "IHA250526",
      description: "IRAN HAMADAN",
      assortment: "RUGS",
      entity: "0001"
    },
    {
      select: "Purchase Rugs - PP781763",
      id: "IHA250526",
      description: "IRAN HAMADAN",
      assortment: "RUGS",
      entity: "0001"
    },
    {
      select: "Purchase Rugs - PP781763",
      id: "IHA250526",
      description: "IRAN HAMADAN",
      assortment: "RUGS",
      entity: "0001"
    },
    {
      select: "Purchase Rugs - PP781763",
      id: "IHA250526",
      description: "IRAN HAMADAN",
      assortment: "RUGS",
      entity: "0001"
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
  const [processType] = useState([
    { value: "1", name: "Purchase" },
    { value: "2", name: "process2" },
    { value: "3", name: "process3" },
    { value: "4", name: "process4" }
  ]);

  return (
    <Container>
      <Row >
        <Col md={4}>
          <select
            className="selector process-selector selector-lt rel-text"
            name="companyA"
          >
            {processType.map((e, key) => {
              return (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <Button className="blue-button plus-button-icon rel-text" size="sm">
            + 
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
              Header: "Select",
              Cell: () => (
                <div>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" />
                  </Form.Group>
                </div>
              )
            },
            {
              Header: "ID",
              accessor: "id"
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Assortment",
              accessor: "assortment"
            },
            {
              Header: "Entity",
              accessor: "entity"
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

export default NewProcess;
