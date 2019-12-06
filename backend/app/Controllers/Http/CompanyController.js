const Company = use("App/Models/Company");
const Database = use('Database');

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

  async addCompany({request}) {
    const body = request.post();
    const {name,organization, tenant, clientId,clientSecret} = body.data;
    console.log('data in controller: ', body.data);
    return await Database.table('companies')
        .insert({
          name:name,
          organization:organization,
          tenant:tenant,
          clientId:clientId,
          clientSecret:clientSecret,
        });
  }

  async deleteCompany({ request }) {
    const body = request.post();
    const {id} = body;

    const  company = await Company.find(id)
    return await company.delete(); 
  }
}

module.exports = CompanyController
