
import axios from 'axios';
export default class ProcessTypeService {
    constructor() {
      this.processTypeBasePath = 'http://localhost:3335/new-process';
      this.procTypesBasePath = "http://localhost:3335/proc-type"
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

    getProcessTypeSteps(id, callback) {
      axios
        .get(`${this.procTypesBasePath}/${id}/steps`)
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          console.log(error);
          callback(error);
        });
    }
}