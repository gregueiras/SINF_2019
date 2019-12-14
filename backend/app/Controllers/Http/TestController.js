import {
  getPurchasesOrders,
  getPurchasesInvoices,
  getProcessOrder
} from "../../../services/jasmin";
import getSalesInvoices from "../../../services/jasmin/getSalesInvoices";

import Queue from "../../../lib/Queue";

const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    const { params } = request;
    const { id } = params;
    
    const res = await Queue.add("PO_SO", {
      companyA: 1, // intercompany
      companyB: 2, // feup
      //companyB: 3, // ritaNorinho
      processID: 1,
      step: 1
    });
    
    return res;
    if (id == 1) {
      return await Queue.add(
        "Test",
        {
          delay: 5,
          process: 2,
          step: 1
        },
        "Test_1",
      );
    } else {
      return await Queue.add(
        "Test",
        {
          delay: 30,
          process: 2,
          step: 2
        },
        "Test_0",
      );
    }
  },

  async reset() {
    const a = await Queue.removeAll();

    return a;
  },

  async getSalesInvoicesTest() {
    await Queue.add("SI_PI", {
      companyA: 1, // intercompany -> companyA: customer
      companyB: 2, // feup -> companyB: supplier
      //companyB: 3, // ritaNorinho
      processID: 2,
    });

    const si = await getSalesInvoices({ companyID: 2 });
    return si.data;
  },

  async getPurchasesInvoicesTest() {
    await Queue.add("PP_SR", {
      companyA: 1, // intercompany -> companyA: customer
      companyB: 2, // feup -> companyB: supplier
      //companyB: 3, // ritaNorinho
      processID: 2,
      step: 1
    });

    const si = await getPurchasesInvoices({ companyID: 1 });
    return si.data;
  },

  async getShippingDeliveries() {
    await Queue.add("SG_RG", {
      companyA: 1, // intercompany -> companyA: customer
      companyB: 2 // feup -> companyB: supplier
      //companyB: 3, // ritaNorinho
    });
   const data =  (await getProcessOrder({
    companyID: 2,
    companyKey: "FEUP",
    pageIndex: 1,
    pageSize: 500
  })).data;
   return data;

  }
};

module.exports = TestController;
