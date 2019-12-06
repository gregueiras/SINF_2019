import Queue from "../../../lib/Queue";
import {
  getPurchasesOrders
} from "../../../services/jasmin";
import { constants } from "../../../services/jasmin/constants";

const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    await Queue.add("PO_SO", {
      companyA: 1, // intercompany
      companyB: 2, // feup
      //companyB: 3, // ritaNorinho
    });

    const company = constants.intercompany;

    const sO = await getPurchasesOrders({ company });
    return sO.data;
  },

  async reset() {
    const a = await Queue.removeAll();

    return a;
  }
};

module.exports = TestController;
