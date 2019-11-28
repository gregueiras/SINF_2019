import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import setIcon from '../../Utilities/SetIcon';

function ViewProcess() {
  const [data] = useState([
    {
      step: 1,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
      state: 'Completed',
    },
    {
      step: 2,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
      state: 'Completed',
    },
    {
      step: 3,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
      state: 'Failed',
    },
  ]);

  const [typeOfProcess] = useState('Purchase');
  const [companyA] = useState('MetroCarpetFactory');
  const [companyB] = useState('MetroCarpetDistributor');


  return (
    <Container>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="gray-label">
              Type of Process
            </Form.Label>
            <span className="text-box company-selector pos-lt mb-4">{typeOfProcess}</span>
          </Form.Group>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="gray-label">
              Company A
            </Form.Label>
            <span className="text-box company-selector pos-lt">{companyA}</span>
          </Form.Group>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group>
            <Form.Label className="gray-label">
              Company B
            </Form.Label>
            <span className="text-box company-selector pos-rt">{companyB}</span>
          </Form.Group>
        </Col>
      </Row>
      <div className="reactTable">
        <ReactTable
          data={data}
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
            {
              Header: 'State',
              accessor: 'state',
              Cell: (value) => setIcon(value, true),
              width: 100,
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
      <Link className="blue-button  gen-button rel-text-white pos-rt w-20" size="sm" to="/">
        {'<< Back'}
      </Link>
    </Container>
  );
}

export default ViewProcess;
