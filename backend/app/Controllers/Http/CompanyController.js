const Company = use("App/Models/Company");
const Database = use('Database')

class CompanyController {
  async index() {
    return Company.all();
  }

  async editCompany({ request }) {
    const body = request.post();
    
    const {id,name,organization, tenant, clientId,clientSecret} = body.data;

    const updateRows = Database
        .table('companies')
        .where('id', id)
        .update({ 'name': name, 'organization':organization, 'tenant':tenant, 
                  'clientId':clientId,'clientSecret':clientSecret})

    return updateRows;
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

  async addCompany({request}) {
    const body = request.post();
    const {name,organization, tenant, clientId,clientSecret} = body.data;
    return await Database.table('companies')
        .insert({
          name:name,
          organization:organization,
          tenant:tenant,
          clientId:clientId,
          clientSecret:clientSecret,
          created_at: Database.fn.now(),
          updated_at : Database.fn.now()
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
