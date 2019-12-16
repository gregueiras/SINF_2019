import axios from 'axios';

export default class ProductService {
  constructor() {
    this.masterDataBasePath = 'http://localhost:3335/master-data';
    this.productBasePath = 'http://localhost:3335/product';
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

  getAllItems(companyId, callback) {
    axios
      .get(`${this.masterDataBasePath}/${companyId}`)
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

  updateCorrespondence(addedCorrespondences, deletedCorrespondences, callback) {
    axios
      .put(`${this.productBasePath}`, {
        addedCorrespondences,
        deletedCorrespondences,
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(error.response);
        callback(error);
      });
  }
}
