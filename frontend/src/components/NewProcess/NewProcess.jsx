/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  Container, Form, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './NewProcess.css';

function NewProcess() {
  const [data] = useState([
    {
      select: 'Purchase Rugs - PP781763',
      id: 'IHA250526',
      description: 'IRAN HAMADAN',
      assortment: 'RUGS',
      entity: '0001',
    },
    {
      select: 'Purchase Rugs - PP781763',
      id: 'IHA250526',
      description: 'IRAN HAMADAN',
      assortment: 'RUGS',
      entity: '0001',
    },
    {
      select: 'Purchase Rugs - PP781763',
      id: 'IHA250526',
      description: 'IRAN HAMADAN',
      assortment: 'RUGS',
      entity: '0001',
    },
    {
      select: 'Purchase Rugs - PP781763',
      id: 'IHA250526',
      description: 'IRAN HAMADAN',
      assortment: 'RUGS',
      entity: '0001',
    },
  ]);
  const [companyAoptions] = useState([
    { value: '1', name: 'MetroCarpetDistributor' },
    { value: '2', name: 'MetroCarpetFactory' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);
  const [companyBoptions] = useState([
    { value: '1', name: 'MetroCarpetFactory' },
    { value: '2', name: 'MetroCarpetDistributor' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);
  const [processType] = useState([
    { value: '1', name: 'Purchase' },
    { value: '2', name: 'process2' },
    { value: '3', name: 'process3' },
    { value: '4', name: 'process4' },
  ]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <select
            className="selector process-selector pos-lt rel-text-white"
            name="companyA"
          >
            {processType.map((e, key) => (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>

          <Link className="blue-button gen-button plus-button-icon rel-text-white" size="sm" to="/create-process-type">
            +
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <select
            className="selector company-selector pos-lt rel-text-white"
            name="companyA"
          >
            {companyAoptions.map((e, key) => (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <select
            className="selector company-selector pos-rt rel-text-white"
            name="companyB"
          >
            {companyBoptions.map((e, key) => (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Select',
              Cell: () => (
                <div>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" />
                  </Form.Group>
                </div>
              ),
            },
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Description',
              accessor: 'description',
            },
            {
              Header: 'Assortment',
              accessor: 'assortment',
            },
            {
              Header: 'Entity',
              accessor: 'entity',
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>

      <Link className="blue-button  gen-button rel-text-white pos-rt w-20" size="sm" to="/">
             V Confirm
      </Link>
      <Link className="gray-button gen-button rel-text-blue pos-rt mr-5 w-20" size="sm" to="/">
            X Cancel
      </Link>


    </Container>
  );
}

export default NewProcess;
