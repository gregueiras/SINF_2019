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
      dataCompanyA: [
      ],
      dataCompanyB: [{
        id: 'IHA250526',
        description: 'IRAN HAMADAN',
      },
      {
        id: 'IHA250526',
        description: 'IRAN HAMADAN',
      },
      ],

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
      ],

      loadingCompanyA: true,
      pageIndex: 1,

    };
    this.CompanyService = new CompanyService();
  }

  componentDidMount() {
    this.onFetchData(0, 10);
  }

  onFetchData(page, pageSize) {
    this.setState({ loadingCompanyA: true });
    this.CompanyService.getItems(page, pageSize, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyA = data.data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        this.setState({ dataCompanyA, loadingCompanyA: false });
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
      companyAoptions, companyBoptions, categoryOptions, loadingCompanyA,
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
                loading={loadingCompanyA}
                showPageSizeOptions={false}
                onPageChange={(pageIndex) => {
                  this.onFetchData(pageIndex, 10);
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
                showPageSizeOptions={false}
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
