const Company = use("App/Models/Company");
const Database = use('Database');

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
