import Queue from "../../../lib/Queue";
import { getSeries } from "../../../services/jasmin";


const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    //await Queue.add("Test", { data: "payload" });
    await Queue.add("PO_SO", { 
      companyA: "FEUP",
      companyB: "SINF",
    });

    const sO = await getSeries();
    return sO.data;
  }
};

module.exports = TestController;
