import Queue from "../../../lib/Queue";
import {
  getPurchasesOrders,
  getPurchasesInvoices
} from "../../../services/jasmin";

const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    await Queue.add("PO_SO", {
      companyA: 1, // intercompany
      companyB: 2, // feup
      //companyB: 3, // ritaNorinho
    });

    const sO = await getPurchasesOrders({ companyID: 1 });
    return sO.data;
  },

  async reset() {
    const a = await Queue.removeAll();

    return a;
  },

  async getSalesInvoicesTest(){

   await Queue.add("SI_PI", {
      companyA: 1, // intercompany -> companyA: customer
      companyB: 2, // feup -> companyB: supplier
      //companyB: 3, // ritaNorinho
    });

    const si = await getSalesInvoices({companyID: 2});
    return si.data;
  },

  async getPurchasesInvoicesTest(){

    await Queue.add("PP_SR", {
      companyA: 1, // intercompany -> companyA: customer
      companyB: 2, // feup -> companyB: supplier
      //companyB: 3, // ritaNorinho
    });

     const si = await getPurchasesInvoices({companyID: 1});
     return si.data;
   }

};

module.exports = TestController;
