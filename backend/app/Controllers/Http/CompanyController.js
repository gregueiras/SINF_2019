const Company = use("App/Models/Company");

class CompanyController {
  async index() {
    return Company.all();
  }

  async editCompany({ request }) {
    const body = request.post();

    const { organization, tenant, clientId, clientSecret } = body.data;
    let company = await Company.findBy("name", body.data.name);
    console.log("company " + company);
    company = { ...company, organization, tenant, clientId, clientSecret };
    return await company.save();
  }

  async get({ request }) {
    const { params } = request;
    const { id } = params;
    
    return Company.find(id);
  }
}

module.exports = CompanyController
