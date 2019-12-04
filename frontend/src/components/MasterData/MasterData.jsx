/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import AlertDismissible from '../Alert/Alert';

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
      company_a: '',
      company_b: '',
      loadingCompanyA: true,
      loadingCompanyB: true,
      loadingDataCorrespondence: true,

      pageSize: 10,

      deletedCorrespondences: [],
      addedCorrespondences: [],

      show: false,
      showVariant: '',
      showText: '',
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
        company_b: reverse[0].id,
        company_a: response.data[0].id,
      });
      this.onFetchDataCorrespondance(response.data[0].id, reverse[0].id);
    });
  }

  onCancel(e) {
    e.preventDefault();
    const { company_a, company_b } = this.state;
    this.setState({ loadingDataCorrespondence: true });
    this.onFetchDataCorrespondance(company_a, company_b);
    this.setState({ deletedCorrespondences: [], addedCorrespondences: [] });
  }


  onConfirm(e) {
    e.preventDefault();
    const { addedCorrespondences, deletedCorrespondences } = this.state;
    const filtered = addedCorrespondences.filter((correspondence) => correspondence.id_company_a != null && correspondence.id_company_b != null);

    if (filtered.length !== addedCorrespondences.length) {
      this.setState({ show: true, showVariant: 'danger', showText: 'All new correspondences must have an id in company A and an id in company B' });
      return;
    }

    this.CompanyService.updateCorrespondence(
      filtered,
      deletedCorrespondences,
      (response) => {
        console.log(response);
        this.setState({ show: true, showVariant: 'success', showText: 'All updates were succesfully made!' });
      },
    );
  }

  onFetchDataCorrespondance(companyAId, companyBId) {
    this.CompanyService.getCorrespondence(companyAId, companyBId,
      (response) => {
        const dataCorrespondence = response.data.map((item) => (
          { id: item.id, id_company_a: item.id_company_a, id_company_b: item.id_company_b }
        ));
        this.setState({ dataCorrespondence, loadingDataCorrespondence: false });
      });
  }


  onFetchDataCompanyA(page, value = null) {
    const { company_a, pageSize } = this.state;
    let cA = company_a;
    if (value !== null && value !== company_a) { cA = value; }
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
    const { company_b, pageSize } = this.state;
    let cB = company_b;
    if (value !== null && value !== company_b) { cB = value; }
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
    let pos = -1;
    const {
      dataCorrespondence,
      addedCorrespondences,
      company_a, company_b,
    } = this.state;

    const found = dataCorrespondence.some((el) => el.id_company_a === id);
    if (found) return;

    dataCorrespondence.map((data, sidx) => {
      if (data.id_company_a === null && position === -1) {
        position = sidx;
      }
    });
    addedCorrespondences.map((data, sidx) => {
      if (data.id_company_a === null && pos === -1) {
        pos = sidx;
      }
    });
    if (position === -1) {
      dataCorrespondence.push({ id_company_a: id, id_company_b: null });
    } else {
      dataCorrespondence[position].id_company_a = id;
    }
    if (pos === -1) {
      addedCorrespondences.push({
        id_company_a: id, id_company_b: null, company_a, company_b,
      });
    } else {
      addedCorrespondences[pos].id_company_a = id;
    }

    this.setState({
      dataCorrespondence,
      addedCorrespondences,
    });
  }

  addIdToDataCorrespondenceB(e, id) {
    e.preventDefault();
    let position = -1;
    let pos = -1;
    const {
      dataCorrespondence,
      addedCorrespondences,
      company_a, company_b,
    } = this.state;

    const found = dataCorrespondence.some((el) => el.id_company_b === id);
    if (found) return;

    dataCorrespondence.map((data, sidx) => {
      if (data.id_company_b === null && position === -1) {
        position = sidx;
      }
    });
    addedCorrespondences.map((data, sidx) => {
      if (data.id_company_b === null && pos === -1) {
        pos = sidx;
      }
    });
    if (position === -1) {
      dataCorrespondence.push({ id_company_a: null, id_company_b: id });
    } else {
      dataCorrespondence[position].id_company_b = id;
    }
    if (pos === -1) {
      addedCorrespondences.push({
        id_company_a: null, id_company_b: id, company_a, company_b,
      });
    } else {
      addedCorrespondences[pos].id_company_b = id;
    }
    this.setState({
      dataCorrespondence,
      addedCorrespondences,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeFromCorrespondence(col, id, correspondence) {
    const c = correspondence;
    let position = -1;
    correspondence.map((data, sidx) => {
      if (col === 1 && data.id_company_a === id && position === -1) {
        position = sidx;
      }
      if (col === 2 && data.id_company_b === id && position === -1) {
        position = sidx;
      }
    });
    if (col === 1 && position !== -1) { c[position].id_company_a = null; }
    if (col === 2 && position !== -1) { c[position].id_company_b = null; }
    return c;
  }

  addToDeletedCorrespondences(col, id) {
    const {
      addedCorrespondences,
      dataCorrespondence,
      deletedCorrespondences,
      company_a, company_b,
    } = this.state;
    let position = -1;

    dataCorrespondence.map((data, sidx) => {
      if (col === 1 && data.id_company_a === id && position === -1) {
        position = sidx;
      }
      if (col === 2 && data.id_company_b === id && position === -1) {
        position = sidx;
      }
    });

    const correspondence = dataCorrespondence[position];
    const { id_company_a, id_company_b } = correspondence;
    const idc = correspondence.id;
    position = -1;
    addedCorrespondences.map((data, sidx) => {
      if (data.id_company_a === id_company_a && data.id_company_b === id_company_b && position === -1) {
        position = sidx;
      }
    });

    if (position !== -1 || id_company_a === null || id_company_b === null) { return; }

    deletedCorrespondences.push({
      id: idc, company_a, company_b, id_company_a, id_company_b,
    });
    this.setState({ deletedCorrespondences });
  }


  removeFromDataCorrespondence(e, col, id) {
    e.preventDefault();
    const {
      dataCorrespondence,
      addedCorrespondences,
    } = this.state;

    this.addToDeletedCorrespondences(col, id);
    this.setState({
      dataCorrespondence:
      this.removeFromCorrespondence(col, id, dataCorrespondence),
      addedCorrespondences:
      this.removeFromCorrespondence(col, id, addedCorrespondences),
    });
  }

  render() {
    const {
      dataCorrespondence, dataCompanyA, dataCompanyB,
      companyAoptions, companyBoptions,
      loadingCompanyA, loadingCompanyB, loadingDataCorrespondence,
      pageIndexA, pageIndexB, pageSize,
      company_b, company_a, show, showVariant, showText,
    } = this.state;

    return (
      <Container>
        <AlertDismissible variant={showVariant} show={show} setShow={() => { this.setState({ show: false }); }} text={showText} />
        <Row id="companySelectorsRow">
          <Col md={4}>
            <div className="gray-label"> Company A </div>
            <select
              className="selector company-selector pos-lt rel-text-white"
              name="company_a"
              onChange={(e) => {
                this.onFetchDataCompanyA(pageIndexA, e.target.value);
                this.onFetchDataCorrespondance(e.target.value, company_b);
                this.setState({ company_a: e.target.value });
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
              name="company_b"
              onChange={(e) => {
                this.onFetchDataCompanyB(pageIndexB, e.target.value);
                this.onFetchDataCorrespondance(company_a, e.target.value);
                this.setState({ company_b: e.target.value });
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
                loading={loadingDataCorrespondence}
                showPageSizeOptions={false}
                pagination
                columns={[
                  {
                    Header: 'ID - A',
                    accessor: 'id_company_a',
                    Cell: ({ row }) => (
                      <button onClick={(e) => this.removeFromDataCorrespondence(e, 1, row.id_company_a)}>
                        {row.id_company_a}
                      </button>
                    ),
                  },
                  {
                    Header: 'ID - B',
                    accessor: 'id_company_b',
                    Cell: ({ row }) => (
                      <button onClick={(e) => this.removeFromDataCorrespondence(e, 2, row.id_company_b)}>
                        {row.id_company_b}
                      </button>
                    ),
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
        <div className="pos-rt mb-5">
          <Button
            className="gray-button gen-button rel-text-blue mr-5"
            size="sm"
            onClick={(e) => this.onCancel(e)}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-3" />
          Cancel
          </Button>
          <Button className="blue-button gen-button rel-text-white" size="sm" onClick={(e) => this.onConfirm(e)}>
            <FontAwesomeIcon icon={faCheck} className="mr-3" />
          Confirm
          </Button>
        </div>

      </Container>
    );
  }
}

export default withRouter(MasterData);
