import  getItems  from "../../../services/jasmin/getItems";


const MasterDataController = {
  // eslint-disable-next-line no-unused-vars
  async getAll({ request, response, view }) {
    const items = await getItems(1, 20); //TODO CHANGE TO RECEIVE PAGE AND SIZE IN REQUEST
    return items.data;
  }
};

module.exports = MasterDataController;
