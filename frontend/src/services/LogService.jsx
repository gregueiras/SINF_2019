import axios from 'axios';

export default class LogService {
  constructor() {
    this.logsBasePath = 'http://localhost:3335/log';
  }
  getLogs(callback){
    axios
    .get(`${this.logsBasePath}`)
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });
  }

    getLogsBetween2Companies(companyA, companyB, callback){
      axios
      .get(`${this.logsBasePath}/${companyA}/${companyB}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(error);
        callback(error);
      });
  }
  
  
  
}