'use strict'
const Product = use("App/Models/Product");

class ProductController {
  async index() {
    return Product.all();
  }

  async getCorrespondence(request, response) {
    const { params } = request;
    const { companyA, companyB } = params;
    const ab = (await Product.query().where({company_a: companyA, company_b: companyB}).fetch()).toJSON();
    const ba = (await Product.query().where({company_a: companyB, company_b: companyA}).fetch()).toJSON();
    return ab.concat(ba);
  }
}

module.exports = ProductController
