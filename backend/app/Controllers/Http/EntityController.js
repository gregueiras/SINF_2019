"use strict";
const Entity = use("App/Models/Entity");

class EntityController {
  async index() {
    return Entity.all();
  }

  async getAllCorrespondences(request, response) {
    const { params } = request;
    const { companyA, companyB } = params;
    const ab = (
      await Entity.query()
        .where({ company_a: companyA, company_b: companyB })
        .fetch()
    ).toJSON();
    return ab;
  }

  async updateCorrespondence({ request }, response) {
    const body = request.post();
    const { addedCorrespondences, deletedCorrespondences } = body;
    if (addedCorrespondences.length !== 0) {
      const entities = await Entity.createMany(addedCorrespondences);
    }
    if (deletedCorrespondences.length !== 0) {
      deletedCorrespondences.forEach(async element => {
        const { id } = element;
        console.log(id);
        const entity = await Entity.find(id);
        await entity.delete();
      });
    }
  }
}

module.exports = EntityController;
