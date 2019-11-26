/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function ViewProcess() {
  const [data, setData] = useState([
    {
      step: 1,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
    },
    {
      step: 2,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
    },
    {
      step: 3,
      trigger: 'Create Purchase Order',
      action: 'Create Sales Order',
      flow: 'A->B',
    },
  ]);

  const [stepNr, setStepNr] = useState(4);

  const [triggerOptions] = useState([
    { value: '1', name: 'trigger1' },
    { value: '2', name: 'trigger2' },
  ]);

  const [triggerCompanyOptions] = useState([
    { value: '1', name: 'MetroCarpetFactory' },
    { value: '2', name: 'MetroCarpetDistributor' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);

  const [actionOptions] = useState([
    { value: '1', name: 'action1' },
    { value: '2', name: 'action2' },
  ]);
  const [actionCompanyOptions] = useState([
    { value: '1', name: 'MetroCarpetFactory' },
    { value: '2', name: 'MetroCarpetDistributor' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);

  const [trigger, setTrigger] = useState('1');
  const [triggerCompany, setTriggerCompany] = useState('1');
  const [action, setAction] = useState('1');
  const [actionCompany, setActionCompany] = useState('1');

  const [processName, setProcessName] = useState('');
  const [companyAType, setCompanyAType] = useState('');
  const [companyBType, setCompanyBType] = useState('');


  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
                Process Name
            </Form.Label>
            <Form.Control
              onChange={(e) => setProcessName(e.target.value)}
              placeholder="required"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
                Company A type
            </Form.Label>
            <Form.Control
              onChange={(e) => setCompanyAType(e.target.value)}
              placeholder="required"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
                Company B type
            </Form.Label>
            <Form.Control
              onChange={(e) => setCompanyBType(e.target.value)}
              placeholder="required"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
               Trigger
            </Form.Label>
            <select
              className="selector company-selector rel-text-white"
              name="trigger"
              onChange={(e) => setTrigger(e.target.value)}
              value={trigger}
            >
              {triggerOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
               Trigger Company
            </Form.Label>
            <select
              className="selector company-selector rel-text-white"
              name="triggerCompany"
              onChange={(e) => setTriggerCompany(e.target.value)}
              value={triggerCompany}
            >
              {triggerCompanyOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
               Action
            </Form.Label>
            <select
              className="selector company-selector rel-text-white"
              name="action"
              onChange={(e) => setAction(e.target.value)}
              value={action}
            >
              {actionOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="gray-label">
               Action Company
            </Form.Label>
            <select
              className="selector company-selector rel-text-white"
              name="actionCompany"
              onChange={(e) => setActionCompany(e.target.value)}
              value={actionCompany}
            >
              {actionCompanyOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-center" sm={1} xs={1}>

          <Button
            className="blue-button rel-text-white pos-rt w-75 mt-2"
            onClick={() => {
              const newStep = {
                step: stepNr,
                trigger: triggerOptions.find((element) => element.value === trigger).name,
                action: actionOptions.find((element) => element.value === action).name,
                flow: 'A->B',
              };
              setStepNr(stepNr + 1);
              setData([...data, newStep]);
            }}
          >
            +
          </Button>
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

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
      <div className="pos-rt mb-5">
        <Link className="gray-button gen-button rel-text-blue mr-5 w-20" size="sm" to="/">
          <FontAwesomeIcon icon={faTimes} className="iconCheck" />
          Cancel
        </Link>
        <Link className="blue-button gen-button rel-text-white w-20" size="sm" to="/">
          <FontAwesomeIcon icon={faCheck} className="iconCheck" />
          Confirm
        </Link>
      </div>
    </Container>
  );
}

export default ViewProcess;
