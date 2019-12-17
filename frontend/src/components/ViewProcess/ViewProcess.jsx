import React, { useState , useEffect} from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import setIcon from '../../Utilities/SetIcon';
import ProcessLogService from '../../services/ProcessLogService';


function compareSteps( a, b ) {
  if ( a.step_no < b.step_no ){
    return -1;
  }
  if ( a.step_no > b.step_no ){
    return 1;
  }
  return 0;
}


function ViewProcess(props) {

  const { match } = props;
  const { params } = match;
  const { id } = params;

  const [data, setData] = useState([]);

  const [typeOfProcess, setTypeOfProcess] = useState('Purchase');
  const [companyA, setCompanyA] = useState('MetroCarpetFactory');
  const [companyB, setCompanyB] = useState('MetroCarpetDistributor');
  const [processLogService] = useState(new ProcessLogService());

  useEffect(() => {
   processLogService.getViewProcessLog(id, (response) => {
      if(response.status === 200){
        const { data } = response;
        setData(data.steps.sort(compareSteps));
        setTypeOfProcess(data.process_type_name);
        setCompanyA(data.company_a_name);
        setCompanyB(data.company_b_name);
      }
   })
  }, [processLogService, id])



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
              Customer (A)
            </Form.Label>
            <span className="text-box company-selector pos-lt">{companyA}</span>
          </Form.Group>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group>
            <Form.Label className="gray-label">
              Supplier (B)
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
              accessor: 'step_no',
            },
            {
              Header: 'Trigger',
              accessor: 'trigger_description',
            },
            {
              Header: 'Action',
              accessor: 'action_description',
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

ViewProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};

export default withRouter(ViewProcess);
