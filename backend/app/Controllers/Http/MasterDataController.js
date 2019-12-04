import  getItems  from "../../../services/jasmin/getItems";
import { getSellerParties }  from "../../../services/jasmin/getSellerPartyKey";
import { getPurchaserParties }  from "../../../services/jasmin/getPurchaserParties";

import { constants } from '../../../services/jasmin/constants';

//TODO GET FROM DB
function getCompany(companyId) {
  if(companyId === '1')
    return constants.intercompany;
  if(companyId === '2')
    return constants.feup;
  if(companyId === '3')
    return constants.ritaNorinho;
  return constants.intercompany;
}
const MasterDataController = {
  async getAllItems({ request}) {
    const { params } = request;
    const items = await getItems(params.page, params.pageSize, params.companyId);
    return items.data;
  },

  async getAllSellerParties({request}) {
    const { params } = request;
    const parties = await getSellerParties({company: getCompany(params.companyId)});
    return parties.data;
  },

  async getAllPurchaserParties({request}) {
    const { params } = request;
    const parties = await getPurchaserParties({company: getCompany(params.companyId)});
    return parties.data;
  }
};

module.exports = MasterDataController;
