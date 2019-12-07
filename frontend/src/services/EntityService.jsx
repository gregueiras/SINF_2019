import axios from 'axios';

export default class EntityService {
  constructor() {
    this.masterDataBasePath = 'http://localhost:3335/master-data';
    this.entityBasePath = 'http://localhost:3335/entity';
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

  getCorrespondence(companyA, companyB, callback) {
    axios
      .get(`${this.entityBasePath}/${companyA}/${companyB}/all`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  updateCorrespondence(addedCorrespondences, deletedCorrespondences, callback) {
    axios
      .put(`${this.entityBasePath}`, {
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
