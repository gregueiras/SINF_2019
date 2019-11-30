import axios from 'axios';

export default class ItemsService {
  constructor() {
    this.basePath = 'http://localhost:3335/master-data';
  }

  getItems(callback) {
    axios
      .get(this.basePath)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
