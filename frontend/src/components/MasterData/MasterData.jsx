/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import '../Overview/Overview.css';
import './MasterData.css';

class MasterData extends Component {

  constructor() {
    super();


    this.state = {
      dataCompanyA: [{
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
      ], dataCompanyB: [{
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
      }],

      dataCorrespondence: [
      ],

      companyAoptions: [
        { value: '1', name: 'MetroCarpetDistributor' },
        { value: '2', name: 'MetroCarpetFactory' },
        { value: '3', name: 'option3' },
        { value: '4', name: 'option4' },

      ],
      companyBoptions: [
        { value: '1', name: 'MetroCarpetFactory' },
        { value: '2', name: 'MetroCarpetDistributor' },
        { value: '3', name: 'option3' },
        { value: '4', name: 'option4' },
      ],
      categoryOptions: [
        { value: '1', name: 'Items' },
        { value: '2', name: 'Items2' },
        { value: '3', name: 'Items3' },
        { value: '4', name: 'Items4' },
      ]

    }
  };

  addIdToDataCorrespondenceA(e, id) {
    e.preventDefault();
    let position = -1;
    this.state.dataCorrespondence.map((data, sidx) => {
      if (data.idA === null && position === -1) {
        position = sidx;
      }
    });
    if (position === -1)
      this.state.dataCorrespondence.push({ idA: id, idB: null });
    else this.state.dataCorrespondence[position].idA = id;

    this.setState({
      dataCompanyA: this.state.dataCompanyA, dataCompanyB: this.state.dataCompanyB,
      dataCorrespondence: this.state.dataCorrespondence, companyAoptions: this.state.companyAoptions,
      companyBoptions: this.state.companyBoptions, categoryOptions: this.state.categoryOptions
    });



  }

  addIdToDataCorrespondenceB(e, id) {
    e.preventDefault();
    let position = -1;
    this.state.dataCorrespondence.map((data, sidx) => {
      if (data.idB === null && position === -1) {
        position = sidx;

      }
    });
    if (position === -1)
      this.state.dataCorrespondence.push({ idA: null, idB: id });
    else this.state.dataCorrespondence[position].idB = id;

    this.setState({
      dataCompanyA: this.state.dataCompanyA, dataCompanyB: this.state.dataCompanyB,
      dataCorrespondence: this.state.dataCorrespondence, companyAoptions: this.state.companyAoptions,
      companyBoptions: this.state.companyBoptions, categoryOptions: this.state.categoryOptions
    });




  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={4}>
            <div className="gray-label"> Category </div>
            <select
              className="selector category-selector pos-lt rel-text-white"
              name="category"
            >
              {this.state.categoryOptions.map((e, key) => (
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
              {this.state.companyAoptions.map((e, key) => (
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
              {this.state.companyBoptions.map((e, key) => (
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
                data={this.state.dataCompanyA
                }
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'id',
                    Cell: ({ row }) => (
                      <button onClick={e => this.addIdToDataCorrespondenceA(e, row.id)}>
                        {row.id}
                      </button>
                    )
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
                data={this.state.dataCorrespondence}
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
                data={this.state.dataCompanyB}
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'id',
                    Cell: ({ row }) => (
                      <button onClick ={e => this.addIdToDataCorrespondenceB(e, row.id)}>
                        {row.id}
                      </button>
                    )
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
}

export default withRouter(MasterData);
