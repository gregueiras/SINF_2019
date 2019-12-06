const Company = use("App/Models/Company");

class CompanyController {
  async index() {
    return Company.all();
  }

  async editCompany({ request }) {
    const body = request.post();

    const {id,name,organization, tenant, clientId,clientSecret} = body.data;

    const  company = await Company.find(id)
    company.name =name;
    company.organization = organization;
    company.tenant = tenant;
    company.clientId = clientId;
    company.clientSecret = clientSecret;
    return await company.save(); 
  }
  
  async get({ request }) {
    const { params } = request;
    const { id } = params;
    
    return Company.find(id);
  }
}

module.exports = CompanyController
