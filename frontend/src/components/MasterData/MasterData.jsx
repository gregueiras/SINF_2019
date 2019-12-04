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


    this.onFetchDataCompanyB = this.onFetchDataCompanyB.bind(this);
    this.onFetchDataCompanyA = this.onFetchDataCompanyA.bind(this);
    this.onFetchDataCorrespondance = this.onFetchDataCorrespondance.bind(this);
    this.updateCorrespondence = this.updateCorrespondence.bind(this);
  }

  onFetchDataCorrespondance(companyAId, companyBId, callback) {
    this.ProductService.getCorrespondence(companyAId, companyBId,
      (response) => {
        console.log(response);
        const dataCorrespondence = response.data.map((item) => (
          { id: item.id, id_company_a: item.id_company_a, id_company_b: item.id_company_b }
        ));
        callback(dataCorrespondence);
      });
  }


  onFetchDataCompanyA(page, callback, value = null) {
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
        // this.setState({ dataCompanyA, loadingCompanyA: false });
        callback(dataCompanyA);
      }
    });
  }

  onFetchDataCompanyB(page, callback, value = null) {
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
        callback(dataCompanyB);
      }
    });
  }

  updateCorrespondence(filtered, deletedCorrespondences, callback) {
    this.ProductService.updateCorrespondence(
      filtered,
      deletedCorrespondences,
      (response) => {
        console.log(response);
        callback(response);
      },
    );
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
          onFetchDataCompanyA={this.onFetchDataCompanyA}
          onFetchDataCorrespondance={this.onFetchDataCorrespondance}
          onFetchDataCompanyB={this.onFetchDataCompanyB}
          updateCorrespondence={this.updateCorrespondence}
        />


      </Container>
    );
  }
}

export default withRouter(MasterData);
