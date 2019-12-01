import  getItems  from "../../../services/jasmin/getItems";


const MasterDataController = {
  // eslint-disable-next-line no-unused-vars
  async getAll({ request, response, view }) {
    const { params } = request;
    const items = await getItems(params.page, params.pageSize); //TODO CHANGE TO RECEIVE PAGE AND SIZE IN REQUEST
    return items.data;
  }
};

module.exports = MasterDataController;
