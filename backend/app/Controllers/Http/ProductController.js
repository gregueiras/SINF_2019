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

  async updateCorrespondence({request}, response) {
    const body = request.post();
    const {addedCorrespondences, deletedCorrespondences} = body;
    if(addedCorrespondences.length !== 0) {
      //const data = addedCorrespondences.collect(['id_company_a', 'id_company_b', 'company_a', 'company_b'])
      const products = await Product.createMany(addedCorrespondences); 
    }
  }
}

module.exports = ProductController
