import axios from 'axios';

export default class EntityService {
  constructor() {
    this.masterDataBasePath = 'http://localhost:3335/master-data';
  }


  getSupplierParties(companyId, callback) {
    axios
      .get(`${this.masterDataBasePath}/${companyId}/sellerParties`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getPurchaserParties(companyId, callback) {
    axios
      .get(`${this.masterDataBasePath}/${companyId}/purchaserParties`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  /* getCorrespondence(companyA, companyB, callback) {
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
  } */
}
