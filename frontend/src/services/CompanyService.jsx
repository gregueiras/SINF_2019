import axios from 'axios';

export default class ItemsService {
  constructor() {
    this.masterDataBasePath = 'http://localhost:3335/master-data';
    this.companyBasePath = 'http://localhost:3335/company';
    this.productBasePath = 'http://localhost:3335/product';
  }

  getCompanies(callback) {
    axios
      .get(`${this.companyBasePath}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getItems(size, pageSize, companyId, callback) {
    axios
      .get(`${this.masterDataBasePath}/${companyId}/${size + 1}/${pageSize}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getCorrespondence(companyA, companyB, callback) {
    axios
      .get(`${this.productBasePath}/${companyA}/${companyB}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
