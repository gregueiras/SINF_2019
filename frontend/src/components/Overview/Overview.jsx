/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import { Link, withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

import './Overview.css';

function Overview() {
  const [data] = useState([
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Completed',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Failed',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Pending',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'In progress',
      timestamp: '12/02/2019 19:01',
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
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Link
            className="blue-button gen-button plus-button rel-text-white"
            size="sm"
            to="/new-process"
          >
          + Process
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
              name="companyA"
            >
              {companyAoptions.map((e, key) => (
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
              {companyBoptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
      </Row>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Process',
              accessor: 'process',
            },
            {
              Header: 'State',
              accessor: 'state',
            },
            {
              Header: 'Timestamp',
              accessor: 'timestamp',
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

export default withRouter(Overview);
