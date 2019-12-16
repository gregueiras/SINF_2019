/* eslint-disable react/sort-comp */
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
import EntityService from '../../services/EntityService';


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
    this.EntityService = new EntityService();

    this.onFetchDataCompanyBItems = this.onFetchDataCompanyBItems.bind(this);
    this.onFetchDataCompanyAItems = this.onFetchDataCompanyAItems.bind(this);
    this.onFetchDataCorrespondanceItems = this.onFetchDataCorrespondanceItems.bind(this);
    this.updateCorrespondenceItems = this.updateCorrespondenceItems.bind(this);

    this.onFetchDataCompanyAParties = this.onFetchDataCompanyAParties.bind(this);
    this.onFetchDataCompanyBParties = this.onFetchDataCompanyBParties.bind(this);
    this.onFetchDataCorrespondanceParties = this.onFetchDataCorrespondanceParties.bind(this);
    this.updateCorrespondenceParties = this.updateCorrespondenceParties.bind(this);

  }

  onFetchDataCorrespondanceItems(companyAId, companyBId, callback) {
    this.ProductService.getCorrespondence(companyAId, companyBId,
      (response) => {
        const dataCorrespondence = response.data.map((item) => (
          { id: item.id, id_company_a: item.id_company_a, id_company_b: item.id_company_b }
        ));
        callback(dataCorrespondence);
      });
  }

  onFetchDataCompanyAItems(page, callback, value = null) {
    const { company_a } = this.state;
    let cA = company_a;
    if (value !== null && value !== company_a) { cA = value; }
    this.ProductService.getAllItems( cA, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyA = data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        callback(dataCompanyA);
      }
    });
  }

  onFetchDataCompanyBItems(page, callback, value = null) {
    const { company_b } = this.state;
    let cB = company_b;
    if (value !== null && value !== company_b) { cB = value; }
    this.ProductService.getAllItems( cB, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyB = data.map((item) => (
          { id: item.itemKey, description: item.description }
        ));
        callback(dataCompanyB);
      }
    });
  }

  updateCorrespondenceItems(filtered, deletedCorrespondences, callback) {
    this.ProductService.updateCorrespondence(
      filtered,
      deletedCorrespondences,
      (response) => {
        callback(response);
      },
    );
  }


  onFetchDataCorrespondanceParties(companyAId, companyBId, callback) {
    this.EntityService.getCorrespondence(companyAId, companyBId,
      (response) => {
        const dataCorrespondence = response.data.map((item) => (
          { id: item.id, id_company_a: item.id_company_a, id_company_b: item.id_company_b }
        ));
        callback(dataCorrespondence);
      });
  }

  onFetchDataCompanyAParties(pageIndex, callback, value = null) {
    const cA = value;
    this.EntityService.getPurchaserParties(cA, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyA = data.map((item) => (
          { id: item.partyKey, description: item.name }
        ));
        callback(dataCompanyA);
      }
    });
  }

  onFetchDataCompanyBParties(pageIndex, callback, value = null) {
    const cB = value;
    this.EntityService.getSupplierParties(cB, (response) => {
      if (response.status === 200) {
        const { data } = response;
        const dataCompanyB = data.map((item) => (
          { id: item.partyKey, description: item.name }
        ));
        callback(dataCompanyB);
      }
    });
  }

  updateCorrespondenceParties(filtered, deletedCorrespondences, callback) {
    this.EntityService.updateCorrespondence(
      filtered,
      deletedCorrespondences,
      (response) => {
        callback(response);
      },
    );
  }


  render() {
    const { category } = this.state;
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

        {category === 'items' ? (
          <MasterDataTable
            onFetchDataCompanyA={this.onFetchDataCompanyAItems}
            onFetchDataCorrespondance={this.onFetchDataCorrespondanceItems}
            onFetchDataCompanyB={this.onFetchDataCompanyBItems}
            updateCorrespondence={this.updateCorrespondenceItems}
            pagination={false}
            companyAlabel="Products"
            companyBlabel="Products"
            columnName="Description"
          />
        ) : null}

        {category === 'entities' ? (
          <MasterDataTable
            onFetchDataCompanyA={this.onFetchDataCompanyAParties}
            onFetchDataCorrespondance={this.onFetchDataCorrespondanceParties}
            onFetchDataCompanyB={this.onFetchDataCompanyBParties}
            updateCorrespondence={this.updateCorrespondenceParties}
            pagination={false}
            companyAlabel="Suppliers"
            companyBlabel="Customers"
            columnName="Name"
          />
        ) : null}

      </Container>
    );
  }
}

export default withRouter(MasterData);
