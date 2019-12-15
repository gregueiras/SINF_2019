import axios from 'axios';

export default class ProcessLogService {
  constructor() {
    this.processLogBasePath = 'http://localhost:3335/processLog';
  }

  getOverviewProcessLogs(companyA, companyB, callback) {
    axios
      .get(`${this.processLogBasePath}/${companyA}/${companyB}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getViewProcessLog(id, callback) {
    axios
    .get(`${this.processLogBasePath}/${id}`)
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error);
    });
  }
}
