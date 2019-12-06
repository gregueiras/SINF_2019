import axios from 'axios';


export default class LogService {
  constructor() {
    this.logsBasePath = 'http://localhost:3335/log';
  }
  getLogs(callback){
    console.log("inside get logs "+callback);
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
}