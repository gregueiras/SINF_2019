/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


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

  console.log(actionCompany);

  return (
    <Container>
      <Row>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
        <Col sm={1} xs={1}>
          <Button
            className="blue-button rel-text-white pos-rt w-75"
            onClick={() => {
              const newStep = {
                step: stepNr,
                trigger: triggerOptions.find((element) => element.value === trigger).name,
                action: actionOptions.find((element) => element.value === action).name,
                flow: 'A->B',
              };
              console.log(newStep);
              setStepNr(stepNr + 1);
              setData([...data, newStep]);
              console.log(data);
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
      <Link className="blue-button  gen-button rel-text-white pos-rt w-20" size="sm" to="/">
             V Confirm
      </Link>
      <Link className="gray-button gen-button rel-text-blue pos-rt mr-5 w-20" size="sm" to="/">
            X Cancel
      </Link>
    </Container>
  );
}

export default ViewProcess;
