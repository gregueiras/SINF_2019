/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import {
  Container, Col,
} from 'react-bootstrap';
import MasterDataTable from '../MasterDataTable/MasterDataTable';


import './MasterData.css';
import CompanyService from '../../services/CompanyService';
import ProductService from '../../services/ProductService';


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

      category: 'items',
    };

    this.CompanyService = new CompanyService();
    this.ProductService = new ProductService();


    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.addIdToDataCorrespondenceB = this.addIdToDataCorrespondenceB.bind(this);
    this.addIdToDataCorrespondenceA = this.addIdToDataCorrespondenceA.bind(this);
    this.removeFromDataCorrespondence = this.removeFromDataCorrespondence.bind(this);
    this.setShow = this.setShow.bind(this);
    this.onPageChangeA = this.onPageChangeA.bind(this);
    this.onPageChangeB = this.onPageChangeB.bind(this);
    this.onChangeCompanyA = this.onChangeCompanyA.bind(this);
    this.onChangeCompanyB = this.onChangeCompanyB.bind(this);
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
    const { company_a, company_b } = this.state;

    this.ProductService.updateCorrespondence(
      filtered,
      deletedCorrespondences,
      (response) => {
        this.setState({ show: true, showVariant: 'success', showText: 'All updates were succesfully made!' });
        this.onFetchDataCorrespondance(company_a, company_b);
        this.setState({ deletedCorrespondences: [], addedCorrespondences: [] });
      },
    );
  }

  onFetchDataCorrespondance(companyAId, companyBId) {
    this.ProductService.getCorrespondence(companyAId, companyBId,
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
    this.ProductService.getItems(page, pageSize, cA, (response) => {
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
    this.ProductService.getItems(page, pageSize, cB, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyB = data.data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        this.setState({ dataCompanyB, loadingCompanyB: false });
      }
    });
  }


  // eslint-disable-next-line react/sort-comp
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


  onPageChangeA(pageIndex) {
    this.setState({ pageIndexA: pageIndex });
    this.onFetchDataCompanyA(pageIndex);
  }

  onPageChangeB(pageIndex) {
    this.setState({ pageIndexB: pageIndex });
    this.onFetchDataCompanyB(pageIndex);
  }

  onChangeCompanyA(e) {
    const { pageIndexA, company_b } = this.state;
    this.onFetchDataCompanyA(pageIndexA, e.target.value);
    this.onFetchDataCorrespondance(e.target.value, company_b);
    this.setState({ company_a: e.target.value });
  }

  onChangeCompanyB(e) {
    const { pageIndexB, company_a } = this.state;
    this.onFetchDataCompanyB(pageIndexB, e.target.value);
    this.onFetchDataCorrespondance(company_a, e.target.value);
    this.setState({ company_b: e.target.value });
  }

  setShow() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Container>
        <Col md={4} className="mb-6">
          <div className="gray-label"> Category </div>
          <select
            className="selector company-selector pos-lt rel-text-white"
            name="company_a"
            onChange={(e) => {
              e.preventDefault();
              this.setState({ category: e.target.value });
            }}
          >
            <option value="items">items</option>
            <option value="entities">entities</option>
          </select>
        </Col>

        <MasterDataTable
          data={this.state}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          addIdToDataCorrespondenceB={this.addIdToDataCorrespondenceB}
          addIdToDataCorrespondenceA={this.addIdToDataCorrespondenceA}
          removeFromDataCorrespondence={this.removeFromDataCorrespondence}
          setShow={this.setShow}
          onPageChangeA={this.onPageChangeA}
          onPageChangeB={this.onPageChangeB}
          onChangeCompanyA={this.onChangeCompanyA}
          onChangeCompanyB={this.onChangeCompanyB}
        />


      </Container>
    );
  }
}

export default withRouter(MasterData);
