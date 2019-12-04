import axios from 'axios';

export default class CompanyService {
  constructor() {
    this.masterDataBasePath = 'http://localhost:3335/master-data';
    this.companyBasePath = 'http://localhost:3335/company';
    this.productBasePath = 'http://localhost:3335/product';
    this.settingsBasePath = 'http://localhost:3335/settings';
  }

  getCompanies(callback) {
    axios
      .get(`${this.companyBasePath}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(error);
        callback(error);
      });
  }


  editCompany(data, callback) {
    console.log(data);
    axios
      .put(`${this.settingsBasePath}`, { data })
      .then((response) => {
        callback(response);
        console.log(`company ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        console.log(error.response);
        callback(error);
      });
  }
}
