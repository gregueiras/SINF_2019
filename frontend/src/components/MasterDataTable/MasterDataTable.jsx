/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import ReactTable from 'react-table';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import AlertDismissible from '../Alert/Alert';

function MasterDataTable(props) {
  const {
    data, onCancel, onConfirm, addIdToDataCorrespondenceB, addIdToDataCorrespondenceA,
    removeFromDataCorrespondence, setShow, onPageChangeA, onPageChangeB,
    onChangeCompanyA, onChangeCompanyB,
  } = props;
  const {
    dataCorrespondence, dataCompanyA, dataCompanyB,
    companyAoptions, companyBoptions,
    loadingCompanyA, loadingCompanyB, loadingDataCorrespondence,
    pageSize,
    show, showVariant, showText,
  } = data;

  return (
    <Container>
      <AlertDismissible variant={showVariant} show={show} setShow={() => setShow()} text={showText} />
      <Row id="companySelectorsRow">
        <Col md={4}>
          <div className="gray-label"> Company A </div>
          <select
            className="selector company-selector pos-lt rel-text-white"
            name="company_a"
            onChange={(e) => onChangeCompanyA(e)}
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
            onChange={(e) => onChangeCompanyB(e)}
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
              onPageChange={(pageIndex) => onPageChangeA(pageIndex)}
              pages={20} // TODO CHECK NR OF PAGES
              manual
              columns={[
                {
                  Header: 'ID',
                  accessor: 'id',
                  Cell: ({ row }) => (
                    <button onClick={(e) => addIdToDataCorrespondenceA(e, row.id)}>
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
                    <button onClick={(e) => removeFromDataCorrespondence(e, 1, row.id_company_a)}>
                      {row.id_company_a}
                    </button>
                  ),
                },
                {
                  Header: 'ID - B',
                  accessor: 'id_company_b',
                  Cell: ({ row }) => (
                    <button onClick={(e) => removeFromDataCorrespondence(e, 2, row.id_company_b)}>
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
              onPageChange={(pageIndex) => onPageChangeB(pageIndex)}
              pages={20} // TODO CHECK NR OF PAGES
              manual
              columns={[
                {
                  Header: 'ID',
                  accessor: 'id',
                  Cell: ({ row }) => (
                    <button onClick={(e) => addIdToDataCorrespondenceB(e, row.id)}>
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
          onClick={(e) => onCancel(e)}
        >
          <FontAwesomeIcon icon={faTimes} className="mr-3" />
          Cancel
        </Button>
        <Button className="blue-button gen-button rel-text-white" size="sm" onClick={(e) => onConfirm(e)}>
          <FontAwesomeIcon icon={faCheck} className="mr-3" />
          Confirm
        </Button>
      </div>

    </Container>
  );
}

MasterDataTable.propTypes = {
  onCancel: propTypes.func.isRequired,
  onConfirm: propTypes.func.isRequired,
  addIdToDataCorrespondenceB: propTypes.func.isRequired,
  addIdToDataCorrespondenceA: propTypes.func.isRequired,
  removeFromDataCorrespondence: propTypes.func.isRequired,
  setShow: propTypes.func.isRequired,
  onPageChangeA: propTypes.func.isRequired,
  onPageChangeB: propTypes.func.isRequired,
  onChangeCompanyA: propTypes.func.isRequired,
  onChangeCompanyB: propTypes.func.isRequired,
  data: propTypes.shape({
    dataCorrespondence: propTypes.array,
    dataCompanyA: propTypes.array,
    dataCompanyB: propTypes.array,
    companyAoptions: propTypes.array,
    companyBoptions: propTypes.array,
    loadingCompanyA: propTypes.bool,
    loadingCompanyB: propTypes.bool,
    loadingDataCorrespondence: propTypes.bool,
    pageSize: propTypes.number,
    show: propTypes.bool,
    showVariant: propTypes.string,
    showText: propTypes.string,
  }).isRequired,

};


export default MasterDataTable;
