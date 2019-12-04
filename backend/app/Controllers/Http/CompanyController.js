'use strict'
const Company = use("App/Models/Company");

class CompanyController {
  async index() {
    return Company.all();
  }

  /*async editCompany(req, res) {
    const {
      name,
      organization,
      tenant,
      clientId,
      clientSecret,
    } = data;

    const newData = {
      name,
      organization,
      tenant,
      clientId,
      clientSecret,

    };
    const {body} = req;
    const {id,name,organization, clientId,clientSecret,tenant} = body;

    const  company = await Company.find(id);
    company = {...company, name,organization,tenant,clientId,clientSecret};
    company.save();

  }*/

  async get({ request }) {
    console.log(request.params)

    return Company.find(request.params.id)
  }
}

module.exports = CompanyController
