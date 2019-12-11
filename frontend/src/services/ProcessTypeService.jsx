
import axios from 'axios';
export default class ProcessTypeService {
    constructor() {
      this.processTypeBasePath = 'http://localhost:3335/new-process';
    }
  
    getProcessTypes(callback) {
      axios
        .get(`${this.processTypeBasePath}`)
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          console.log(error);
          callback(error);
        });
    }
}