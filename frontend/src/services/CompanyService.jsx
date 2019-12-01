import axios from 'axios';

export default class ItemsService {
  constructor() {
    this.basePath = 'http://localhost:3335/master-data';
  }

  getItems(size, pageSize, callback) {
    axios
      .get(`${this.basePath}/${size + 1}/${pageSize}`)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
