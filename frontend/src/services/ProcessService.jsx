
import axios from 'axios';
export default class ProcessService {
    constructor() {
      this.processBasePath = 'http://localhost:3335/new-process';
    }
    addProcess(data,callback){
      axios.post(`${this.processBasePath}`,{data}).then(response =>{
          callback(response);

      }).catch(error=>{
              callback(error);

      });
  }

}