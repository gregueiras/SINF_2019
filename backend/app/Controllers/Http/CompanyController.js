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

  async setToken({ request }, response) {
    const { token, expires, companyID } = request.post();
    const company = await Company.find(companyID);
    
    company.token = token;
    company.expires = expires;

    company.save();

    return 201;
  }

  async getToken({ request }) {
    const Company = await this.get({ request });

    const time = Date.now();
    if (Company.token !== null && Company.expires !== null && time < Company.expires) {
      return Company.token;
    } else {
      return Company;
    }

  }
}

module.exports = CompanyController
