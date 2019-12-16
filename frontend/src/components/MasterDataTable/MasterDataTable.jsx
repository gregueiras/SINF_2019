/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import ReactTable from "react-table";
import { Container, Row, Col, Button } from "react-bootstrap";
import propTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import AlertDismissible from "../Alert/Alert";

import CompanyService from "../../services/CompanyService";

class MasterDataTable extends Component {
  constructor(props) {
    super(props);
    const {
      onFetchDataCompanyA,
      onFetchDataCompanyB,
      onFetchDataCorrespondance,
      updateCorrespondence,
      pagination,
      companyAlabel,
      companyBlabel,
      columnName
    } = props;
    this.state = {
      dataCompanyA: [],
      dataCompanyB: [],
      dataCorrespondence: [],

      companyAoptions: [],
      companyBoptions: [],

      pageIndexA: 0,
      pageIndexB: 0,
      company_a: "",
      company_b: "",
      loadingCompanyA: true,
      loadingCompanyB: true,
      loadingDataCorrespondence: true,

      pageSize: 10,

      deletedCorrespondences: [],
      addedCorrespondences: [],

      show: false,
      showVariant: "",
      showText: "",

      onFetchDataCompanyA,
      onFetchDataCompanyB,
      onFetchDataCorrespondance,
      updateCorrespondence,
      companyAlabel,
      companyBlabel,
      columnName,

      pagination
    };
    this.CompanyService = new CompanyService();

    this.onFetchDataCorrespondanceCallback = this.onFetchDataCorrespondanceCallback.bind(
      this
    );
    this.onFetchDataCompanyACallback = this.onFetchDataCompanyACallback.bind(
      this
    );
    this.onFetchDataCompanyBCallback = this.onFetchDataCompanyBCallback.bind(
      this
    );
    this.updateCorrespondenceCallback = this.updateCorrespondenceCallback.bind(
      this
    );
  }

  componentDidMount() {
    const {
      pageIndexA,
      pageIndexB,
      onFetchDataCompanyA,
      onFetchDataCompanyB,
      onFetchDataCorrespondance
    } = this.state;
    this.CompanyService.getCompanies(response => {
      const reverse = response.data.slice().reverse();
      onFetchDataCompanyA(
        pageIndexA,
        this.onFetchDataCompanyACallback,
        response.data[0].id
      );
      onFetchDataCompanyB(
        pageIndexB,
        this.onFetchDataCompanyBCallback,
        reverse[0].id
      );
      this.setState({
        companyAoptions: response.data,
        companyBoptions: reverse,
        company_b: reverse[0].id,
        company_a: response.data[0].id
      });
      onFetchDataCorrespondance(
        response.data[0].id,
        reverse[0].id,
        this.onFetchDataCorrespondanceCallback
      );
    });
  }

  onFetchDataCompanyBCallback(dataCompanyB) {
    this.setState({ dataCompanyB, loadingCompanyB: false });
  }

  onFetchDataCompanyACallback(dataCompanyA) {
    this.setState({ dataCompanyA, loadingCompanyA: false });
  }

  onFetchDataCorrespondanceCallback(dataCorrespondence) {
    this.setState({ dataCorrespondence, loadingDataCorrespondence: false });
  }

  onCancel(e) {
    e.preventDefault();
    const { company_a, company_b, onFetchDataCorrespondance } = this.state;
    this.setState({ loadingDataCorrespondence: true });
    onFetchDataCorrespondance(
      company_a,
      company_b,
      this.onFetchDataCorrespondanceCallback
    );
    this.setState({ deletedCorrespondences: [], addedCorrespondences: [] });
  }

  onConfirm(e) {
    e.preventDefault();
    const {
      addedCorrespondences,
      deletedCorrespondences,
      updateCorrespondence
    } = this.state;
    const filtered = addedCorrespondences.filter(
      correspondence =>
        correspondence.id_company_a != null &&
        correspondence.id_company_b != null
    );

    if (filtered.length !== addedCorrespondences.length) {
      this.setState({
        show: true,
        showVariant: "danger",
        showText:
          "All new correspondences must have an id in company A and an id in company B"
      });
      return;
    }

    updateCorrespondence(
      filtered,
      deletedCorrespondences,
      this.updateCorrespondenceCallback
    );
  }

  updateCorrespondenceCallback(response) {
    console.log(response);
    this.setState({
      show: true,
      showVariant: "success",
      showText: "All updates were succesfully made!"
    });
    const { company_a, company_b, onFetchDataCorrespondance } = this.state;
    this.setState({ loadingDataCorrespondence: true });
    onFetchDataCorrespondance(
      company_a,
      company_b,
      this.onFetchDataCorrespondanceCallback
    );
    this.setState({ deletedCorrespondences: [], addedCorrespondences: [] });
  }

  addIdToDataCorrespondenceA(e, id) {
    e.preventDefault();
    let position = -1;
    let pos = -1;
    const {
      dataCorrespondence,
      addedCorrespondences,
      company_a,
      company_b
    } = this.state;

    const found = dataCorrespondence.some(el => el.id_company_a === id);
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
        id_company_a: id,
        id_company_b: null,
        company_a,
        company_b
      });
    } else {
      addedCorrespondences[pos].id_company_a = id;
    }

    this.setState({
      dataCorrespondence,
      addedCorrespondences
    });
  }

  addIdToDataCorrespondenceB(e, id) {
    e.preventDefault();
    let position = -1;
    let pos = -1;
    const {
      dataCorrespondence,
      addedCorrespondences,
      company_a,
      company_b
    } = this.state;

    const found = dataCorrespondence.some(el => el.id_company_b === id);
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
        id_company_a: null,
        id_company_b: id,
        company_a,
        company_b
      });
    } else {
      addedCorrespondences[pos].id_company_b = id;
    }
    this.setState({
      dataCorrespondence,
      addedCorrespondences
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
    if (col === 1 && position !== -1) {
      c[position].id_company_a = null;
    }
    if (col === 2 && position !== -1) {
      c[position].id_company_b = null;
    }
    return c;
  }

  addToDeletedCorrespondences(col, id) {
    const {
      addedCorrespondences,
      dataCorrespondence,
      deletedCorrespondences,
      company_a,
      company_b
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
      if (
        data.id_company_a === id_company_a &&
        data.id_company_b === id_company_b &&
        position === -1
      ) {
        position = sidx;
      }
    });

    if (position !== -1 || id_company_a === null || id_company_b === null) {
      return;
    }

    deletedCorrespondences.push({
      id: idc,
      company_a,
      company_b,
      id_company_a,
      id_company_b
    });
    this.setState({ deletedCorrespondences });
  }

  removeFromDataCorrespondence(e, col, id) {
    e.preventDefault();
    const { dataCorrespondence, addedCorrespondences } = this.state;

    this.addToDeletedCorrespondences(col, id);
    this.setState({
      dataCorrespondence: this.removeFromCorrespondence(
        col,
        id,
        dataCorrespondence
      ),
      addedCorrespondences: this.removeFromCorrespondence(
        col,
        id,
        addedCorrespondences
      )
    });
  }

  render() {
    const {
      dataCorrespondence,
      dataCompanyA,
      dataCompanyB,
      companyAoptions,
      companyBoptions,
      loadingCompanyA,
      loadingCompanyB,
      loadingDataCorrespondence,
      pageIndexA,
      pageIndexB,
      pageSize,
      company_b,
      company_a,
      show,
      showVariant,
      showText,
      onFetchDataCompanyB,
      onFetchDataCompanyA,
      onFetchDataCorrespondance,
      pagination,
      companyAlabel,
      companyBlabel,
      columnName
    } = this.state;
    return (
      <Container>
        <AlertDismissible
          variant={showVariant}
          show={show}
          setShow={() => {
            this.setState({ show: false });
          }}
          text={showText}
        />
        <Row id="companySelectorsRow">
          <Col md={4}>
            <div className="gray-label"> Company A</div>
            <select
              className="selector company-selector pos-lt rel-text-white"
              name="company_a"
              onChange={e => {
                onFetchDataCompanyA(
                  pageIndexA,
                  this.onFetchDataCompanyACallback,
                  e.target.value
                );
                onFetchDataCorrespondance(
                  e.target.value,
                  company_b,
                  this.onFetchDataCorrespondanceCallback
                );
                this.setState({
                  company_a: e.target.value,
                  loadingCompanyA: true,
                  loadingDataCorrespondence: true
                });
              }}
            >
              {companyAoptions
                .filter(e => e.id !== Number(company_b))
                .map((e, key) => {
                  return (
                    <option key={key} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <div className="gray-label"> Company B </div>
            <select
              className="selector company-selector pos-rt rel-text-white"
              name="company_b"
              onChange={e => {
                onFetchDataCompanyB(
                  pageIndexB,
                  this.onFetchDataCompanyBCallback,
                  e.target.value
                );
                onFetchDataCorrespondance(
                  company_a,
                  e.target.value,
                  this.onFetchDataCorrespondanceCallback
                );
                this.setState({
                  company_b: e.target.value,
                  loadingCompanyB: true,
                  loadingDataCorrespondence: true
                });
              }}
            >
              {companyBoptions
                .filter(e => e.id !== Number(company_a))
                .map((e, key) => {
                  return (
                    <option key={key} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="reactTable">
              <div className="gray-label"> Company A {companyAlabel} </div>
              <ReactTable
                data={dataCompanyA}
                loading={loadingCompanyA}
                showPageSizeOptions={false}
                onPageChange={pageIndex => {
                  this.setState({ pageIndexA: pageIndex });
                  onFetchDataCompanyA(
                    pageIndex,
                    this.onFetchDataCompanyACallback,
                    company_a
                  );
                }}
                manual={pagination}
                columns={[
                  {
                    Header: "ID",
                    accessor: "id",
                    Cell: ({ row }) => (
                      <button
                        onClick={e =>
                          this.addIdToDataCorrespondenceA(e, row.id)
                        }
                      >
                        {row.id}
                      </button>
                    )
                  },
                  {
                    Header: columnName,
                    accessor: "description"
                  }
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
                    Header: "ID - A",
                    accessor: "id_company_a",
                    Cell: ({ row }) => (
                      <button
                        onClick={e =>
                          this.removeFromDataCorrespondence(
                            e,
                            1,
                            row.id_company_a
                          )
                        }
                      >
                        {row.id_company_a}
                      </button>
                    )
                  },
                  {
                    Header: "ID - B",
                    accessor: "id_company_b",
                    Cell: ({ row }) => (
                      <button
                        onClick={e =>
                          this.removeFromDataCorrespondence(
                            e,
                            2,
                            row.id_company_b
                          )
                        }
                      >
                        {row.id_company_b}
                      </button>
                    )
                  }
                ]}
                defaultPageSize={pageSize}
                className="-striped -highlight"
              />
              <br />
            </div>
          </Col>
          <Col>
            <div className="reactTable">
              <div className="gray-label"> Company B {companyBlabel} </div>
              <ReactTable
                data={dataCompanyB}
                loading={loadingCompanyB}
                showPageSizeOptions={false}
                onPageChange={pageIndex => {
                  this.setState({ pageIndexB: pageIndex });
                  onFetchDataCompanyB(
                    pageIndex,
                    this.onFetchDataCompanyBCallback,
                    company_b
                  );
                }}
                manual={pagination}
                columns={[
                  {
                    Header: "ID",
                    accessor: "id",
                    Cell: ({ row }) => (
                      <button
                        onClick={e =>
                          this.addIdToDataCorrespondenceB(e, row.id)
                        }
                      >
                        {row.id}
                      </button>
                    )
                  },
                  {
                    Header: columnName,
                    accessor: "description"
                  }
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
            onClick={e => this.onCancel(e)}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-3" />
            Cancel
          </Button>
          <Button
            className="blue-button gen-button rel-text-white"
            size="sm"
            onClick={e => this.onConfirm(e)}
          >
            <FontAwesomeIcon icon={faCheck} className="mr-3" />
            Confirm
          </Button>
        </div>
      </Container>
    );
  }
}

MasterDataTable.propTypes = {
  onFetchDataCompanyA: propTypes.func.isRequired,
  onFetchDataCompanyB: propTypes.func.isRequired,
  onFetchDataCorrespondance: propTypes.func.isRequired,
  updateCorrespondence: propTypes.func.isRequired,
  pagination: propTypes.bool.isRequired,
  companyAlabel: propTypes.string.isRequired,
  companyBlabel: propTypes.string.isRequired,
  columnName: propTypes.string.isRequired
};

export default MasterDataTable;
