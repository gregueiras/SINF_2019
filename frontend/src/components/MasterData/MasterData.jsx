/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import '../Overview/Overview.css';
import './MasterData.css';

function MasterData() {

    const [dataCompanyA] = useState([
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        }
      ]);
      const [dataCompanyB] = useState([
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        },
        {
            id: 'IHA250526',
            description: 'IRAN HAMADAN',
        }
      ]);
      const [dataCorrespondence] = useState([
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        },
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        },
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        },
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        },
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        },
        {
            idA: 'IHA250526',
            idB: 'IHA250526',
        }
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
      const [categoryOptions] = useState([
        { value: '1', name: 'Items' },
        { value: '2', name: 'Items2' },
        { value: '3', name: 'Items3' },
        { value: '4', name: 'Items4' },
      ]);

return(
    <Container>
    <Row>
    <Col md={4}>
    <div className="gray-label"> Category </div>
    <select
            className="selector category-selector pos-lt rel-text-white"
            name="category"
          >
            {categoryOptions.map((e, key) => (
              <option key={key} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>  
    </Col>
    </Row>
    <Row id="companySelectorsRow">
        <Col md={4}>
          <div className="gray-label"> Company A </div>
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
          <div className="gray-label"> Company B </div>
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
    <Row>
    <Col>
    <div className="reactTable">
    <div className="gray-label"> Company A Products </div>
    <ReactTable
          data={dataCompanyA}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Description',
              accessor: 'description',
            }            
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
    </div>     
    </Col>
    <Col>
    <div className="reactTable">
    <div className="gray-label"> ID Correspondence </div>
    <ReactTable
          data={dataCorrespondence}
          columns={[
            {
              Header: 'ID - A',
              accessor: 'idA',
            },
            {
              Header: 'ID - B',
              accessor: 'idB',
            }            
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
    </div>     
    </Col>
    <Col>
    <div className="reactTable">
    <div className="gray-label"> Company B Products </div>
    <ReactTable
          data={dataCompanyB}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Description',
              accessor: 'description',
            }            
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
    </div>     
    </Col>
    </Row>
    
    </Container>
);

}

export default withRouter(MasterData);
 