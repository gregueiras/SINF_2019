/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';


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

  const [companyAOptions] = useState([
    { value: '1', name: 'MetroCarpetDistributor' },
    { value: '2', name: 'MetroCarpetFactory' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);

  const [companyBOptions] = useState([
    { value: '2', name: 'MetroCarpetFactory' },
    { value: '1', name: 'MetroCarpetDistributor' },
    { value: '3', name: 'option3' },
    { value: '4', name: 'option4' },
  ]);


  const [triggerOptions] = useState([
    { value: '1', name: 'trigger1' },
    { value: '2', name: 'trigger2' },
    { value: '3', name: '-' },
  ]);

  const [triggerCompanyOptions, setTriggerCompanyOptions] = useState([
    { value: '2', name: 'MetroCarpetFactory' },
    { value: '1', name: 'MetroCarpetDistributor' },
  ]);

  const [actionOptions] = useState([
    { value: '1', name: 'action1' },
    { value: '2', name: 'action2' },
  ]);

  const [actionCompanyOptions, setActionCompanyOptions] = useState([
    { value: '1', name: 'MetroCarpetDistributor' },
    { value: '2', name: 'MetroCarpetFactory' },
  ]);

  const [trigger, setTrigger] = useState('1');
  const [triggerCompany, setTriggerCompany] = useState('1');
  const [action, setAction] = useState('1');
  const [actionCompany, setActionCompany] = useState('2');
  const [companyA, setCompanyA] = useState('1');
  const [companyB, setCompanyB] = useState('2');

  const [processName, setProcessName] = useState('');
  const [companyAType, setCompanyAType] = useState('');
  const [companyBType, setCompanyBType] = useState('');


  function setCompanyOptions(cA, cB) {
    const ca = companyAOptions.find((element) => element.value === cA);
    const cb = companyBOptions.find((element) => element.value === cB);
    setTriggerCompanyOptions([ca, cb]);
    setTriggerCompany(cA);
    setActionCompanyOptions([cb, ca]);
    setActionCompany(cB);
  }

  function getFlow(){
    if(triggerCompany === companyA){
      if(actionCompany === companyB) return 'A->B';
      if(actionCompany === companyA) return 'A'
    }
    if(triggerCompany === companyB){
      if(actionCompany === companyA) return 'B->A';
      if(actionCompany === companyB) return 'B'
    }
    return "";
  }

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
        <Col md={4} className="mb-4">
          <Form.Group>
            <Form.Label className="gray-label">
                Company A
            </Form.Label>
            <select
              className="selector company-selector pos-lt rel-text-white"
              name="companyA"
              onChange={(e) => {
                setCompanyA(e.target.value);
                setCompanyOptions(e.target.value, companyB);
              }}
            >
              {companyAOptions.map((e, key) => (
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
              onChange={(e) => {
                setCompanyB(e.target.value);
                setCompanyOptions(companyA, e.target.value);
              }}
            >
              {companyBOptions.map((e, key) => (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              ))}
            </select>
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
                flow: getFlow(),
              };
              setStepNr(stepNr + 1);
              setData([...data, newStep]);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="iconPlus" />

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
