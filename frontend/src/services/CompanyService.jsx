import axios from 'axios';

export default class CompanyService {
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
}
