/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import './MasterData.css';
import CompanyService from '../../services/CompanyService';

class MasterData extends Component {
  constructor() {
    super();
    this.state = {
      dataCompanyA: [],
      dataCompanyB: [],
      dataCorrespondence: [],

      companyAoptions: [],
      companyBoptions: [],

      pageIndexA: 0,
      pageIndexB: 0,
      companyA: '',
      companyB: '',
      loadingCompanyA: true,
      loadingCompanyB: true,

      pageSize: 10,
    };
    this.CompanyService = new CompanyService();
  }

  componentDidMount() {
    const { pageIndexA, pageIndexB } = this.state;
    this.CompanyService.getCompanies((response) => {
      const reverse = response.data.slice().reverse();
      this.onFetchDataCompanyA(pageIndexA, response.data[0].id);
      this.onFetchDataCompanyB(pageIndexB, reverse[0].id);
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse,
        companyB: reverse[0].id,
        companyA: response.data[0].id,
      });
    });
  }


  onFetchDataCompanyA(page, value = null) {
    const { companyA, pageSize } = this.state;
    let cA = companyA;
    if (value !== null && value !== companyA) { cA = value; }
    this.setState({ loadingCompanyA: true });
    this.CompanyService.getItems(page, pageSize, cA, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyA = data.data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        this.setState({ dataCompanyA, loadingCompanyA: false });
      }
    });
  }

  onFetchDataCompanyB(page, value = null) {
    const { companyB, pageSize } = this.state;
    let cB = companyB;
    if (value !== null && value !== companyB) { cB = value; }
    this.setState({ loadingCompanyB: true });
    this.CompanyService.getItems(page, pageSize, cB, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyB = data.data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        this.setState({ dataCompanyB, loadingCompanyB: false });
      }
    });
  }


  addIdToDataCorrespondenceA(e, id) {
    e.preventDefault();
    let position = -1;
    const {
      dataCorrespondence,
    } = this.state;
    dataCorrespondence.map((data, sidx) => {
      if (data.idA === null && position === -1) {
        position = sidx;
      }
    });
    if (position === -1) {
      dataCorrespondence.push({ idA: id, idB: null });
    } else dataCorrespondence[position].idA = id;

    this.setState({
      dataCorrespondence,
    });
  }

  addIdToDataCorrespondenceB(e, id) {
    e.preventDefault();
    let position = -1;
    const {
      dataCorrespondence, dataCompanyA, dataCompanyB,
      companyAoptions, companyBoptions, categoryOptions,
    } = this.state;
    dataCorrespondence.map((data, sidx) => {
      if (data.idB === null && position === -1) {
        position = sidx;
      }
    });
    if (position === -1) {
      dataCorrespondence.push({ idA: null, idB: id });
    } else { dataCorrespondence[position].idB = id; }

    this.setState({
      dataCompanyA,
      dataCompanyB,
      dataCorrespondence,
      companyAoptions,
      companyBoptions,
      categoryOptions,
    });
  }

  render() {
    const {
      dataCorrespondence, dataCompanyA, dataCompanyB,
      companyAoptions, companyBoptions,
      loadingCompanyA, loadingCompanyB,
      pageIndexA, pageIndexB, pageSize,
    } = this.state;


    return (
      <Container>
        <Row id="companySelectorsRow">
          <Col md={4}>
            <div className="gray-label"> Company A </div>
            <select
              className="selector company-selector pos-lt rel-text-white"
              name="companyA"
              onChange={(e) => {
                this.onFetchDataCompanyA(pageIndexA, e.target.value);
                this.setState({ companyA: e.target.value });
              }}

            >
              {companyAoptions.map((e, key) => (
                <option key={key} value={e.id}>
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
              onChange={(e) => {
                this.onFetchDataCompanyB(pageIndexB, e.target.value);
                this.setState({ companyB: e.target.value });
              }}
            >
              {companyBoptions.map((e, key) => (
                <option key={key} value={e.id}>
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
                loading={loadingCompanyA}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                  this.setState({ pageIndexA: pageIndex });
                  this.onFetchDataCompanyA(pageIndex);
                }}
                pages={20} // TODO CHECK NR OF PAGES
                manual
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'id',
                    Cell: ({ row }) => (
                      <button onClick={(e) => this.addIdToDataCorrespondenceA(e, row.id)}>
                        {row.id}
                      </button>
                    ),
                  },
                  {
                    Header: 'Description',
                    accessor: 'description',
                  },
                ]}
                defaultPageSize={pageSize}
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
                showPageSizeOptions={false}
                pagination
                columns={[
                  {
                    Header: 'ID - A',
                    accessor: 'idA',
                  },
                  {
                    Header: 'ID - B',
                    accessor: 'idB',
                  },
                ]}
                defaultPageSize={pageSize}
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
                loading={loadingCompanyB}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                  this.setState({ pageIndexB: pageIndex });
                  this.onFetchDataCompanyB(pageIndex);
                }}
                pages={20} // TODO CHECK NR OF PAGES
                manual
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'id',
                    Cell: ({ row }) => (
                      <button onClick={(e) => this.addIdToDataCorrespondenceB(e, row.id)}>
                        {row.id}
                      </button>
                    ),
                  },
                  {
                    Header: 'Description',
                    accessor: 'description',
                  },
                ]}
                defaultPageSize={pageSize}
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
