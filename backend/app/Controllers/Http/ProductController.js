'use strict'
const Product = use("App/Models/Product");

class ProductController {
  async index() {
    return Product.all();
  }

  async getCorrespondence(request, response) {
    const { params } = request;
    const { companyA, companyB } = params;
    return Product.query().where({company_a: companyA, company_b: companyB}).fetch();
  }
}

module.exports = ProductController
