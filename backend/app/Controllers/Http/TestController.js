import Queue from "../../../lib/Queue";
import {
  getSeries,
  getSalesOrders,
  getPurchasesOrders
} from "../../../services/jasmin";
import { constants } from "../../../services/jasmin/constants";

const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    //await Queue.add("Test", { data: "payload" });
    await Queue.add("PO_SO", {
      companyA: "intercompany",
      companyB: "feup",
    });

    const company = constants.intercompany;

    const sO = await getPurchasesOrders({ company });
    return sO.data;
  }
};

module.exports = TestController;
