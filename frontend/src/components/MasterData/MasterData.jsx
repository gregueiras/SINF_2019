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

      companyAoptions: [
        { value: 'intercompany', name: 'intercompany' },
        { value: 'feup', name: 'feup' },
        { value: 'ritaNorinho', name: 'ritaNorinho' },
      ],
      companyBoptions: [
        { value: 'ritaNorinho', name: 'ritaNorinho' },
        { value: 'intercompany', name: 'intercompany' },
        { value: 'feup', name: 'feup' },
      ],
      categoryOptions: [
        { value: '1', name: 'Items' },
        { value: '2', name: 'Items2' },
        { value: '3', name: 'Items3' },
        { value: '4', name: 'Items4' },
      ],
      pageIndexA: 0,
      pageIndexB: 0,
      companyA: 'intercompany',
      companyB: 'ritaNorinho',
      loadingCompanyA: true,
      loadingCompanyB: true,
    };
    this.CompanyService = new CompanyService();
  }

  componentDidMount() {
    this.onFetchDataCompanyA(0, 10);
    this.onFetchDataCompanyB(0, 10);
  }


  onFetchDataCompanyA(page, pageSize, value = null) {
    const { companyA } = this.state;
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

  onFetchDataCompanyB(page, pageSize, value = null) {
    const { companyB } = this.state;
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
      dataCorrespondence, dataCompanyA, dataCompanyB,
      companyAoptions, companyBoptions, categoryOptions,
    } = this.state;
    dataCorrespondence.map((data, sidx) => {
      if (data.idA === null && position === -1) {
        position = sidx;
      }
    });
    if (position === -1) { dataCorrespondence.push({ idA: id, idB: null }); } else dataCorrespondence[position].idA = id;

    this.setState({
      dataCompanyA,
      dataCompanyB,
      dataCorrespondence,
      companyAoptions,
      companyBoptions,
      categoryOptions,
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
      companyAoptions, companyBoptions, categoryOptions, loadingCompanyA, loadingCompanyB,
    } = this.state;
    return (
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
              onChange={(e) => {
                this.onFetchDataCompanyA(0, 10, e.target.value);
                this.setState({ companyA: e.target.value });
              }}

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
              onChange={(e) => {
                this.onFetchDataCompanyB(0, 10, e.target.value);
                this.setState({ companyB: e.target.value });
              }}
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
                loading={loadingCompanyA}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                  this.onFetchDataCompanyA(pageIndex, 10);
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
                loading={loadingCompanyB}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                  // console.log(pageIndex);
                  this.onFetchDataCompanyB(pageIndex, 10);
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
