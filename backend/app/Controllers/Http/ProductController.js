"use strict";
const Product = use("App/Models/Product");

class ProductController {
  async index() {
    return Product.all();
  }

  async getCorrespondence(request) {
    const { params } = request;
    const { companyA, companyB, idCompanyA } = params;
    const correspondence = (
      await Product.query()
        .where({
          company_a: companyA,
          company_b: companyB,
          id_company_a: idCompanyA
        })
        .fetch()
    ).toJSON();

    return correspondence[0];
  }

  async getCorrespondenceB(request) {
    const { params } = request;
    const { companyA, companyB, idCompanyB } = params;
    const correspondence = (
      await Product.query()
        .where({
          company_a: companyA,
          company_b: companyB,
          id_company_b: idCompanyB
        })
        .fetch()
    ).toJSON();

    return correspondence[0];
  }

  async getAllCorrespondences(request, response) {
    const { params } = request;
    const { companyA, companyB } = params;
    const ab = (
      await Product.query()
        .where({ company_a: companyA, company_b: companyB })
        .fetch()
    ).toJSON();
    let ba = (
      await Product.query()
        .where({ company_a: companyB, company_b: companyA })
        .fetch()
    ).toJSON();

    ba = ba.map(element => {
      const { id_company_a, id_company_b } = element;

      return {
        ...element,
        id_company_a: id_company_b,
        id_company_b: id_company_a
      };
    });
    return ab.concat(ba);
  }

  async updateCorrespondence({ request }, response) {
    const body = request.post();
    const { addedCorrespondences, deletedCorrespondences } = body;
    if (addedCorrespondences.length !== 0) {
      const products = await Product.createMany(addedCorrespondences);
    }
    if (deletedCorrespondences.length !== 0) {
      deletedCorrespondences.forEach(async element => {
        const { id } = element;
        console.log(id);
        const product = await Product.find(id);
        await product.delete();
      });
    }
  }
}

module.exports = ProductController;
