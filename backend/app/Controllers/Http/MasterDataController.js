import getItems from "../../../services/jasmin/getItems";
import { getSellerParties } from "../../../services/jasmin/getSellerPartyKey";
import { getPurchaserParties } from "../../../services/jasmin/getPurchaserParties";
import getAllItems from "../../../services/jasmin/getAllItems";

import { constants } from "../../../services/jasmin/constants";

const MasterDataController = {
  async getAllItemsPage({ request }) {
    const { params } = request;
    const items = await getItems(
      params.page,
      params.pageSize,
      params.companyId
    );
    return items.data;
  },


  async getAllItemsFull({ request }) {
    const { params } = request;
    const items = await getAllItems(
      params.companyId
    );
    return items.data;
  },

  async getAllSellerParties({ request }) {
    const { params } = request;
    const { companyId: companyID } = params;

    const parties = await getSellerParties({ companyID });
    return parties.data;
  },

  async getAllPurchaserParties({ request }) {
    const { params } = request;
    const { companyId: companyID } = params;

    const parties = await getPurchaserParties({ companyID });
    return parties.data;
  }
};

module.exports = MasterDataController;
