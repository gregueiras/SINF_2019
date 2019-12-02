'use strict'
const Company = use("App/Models/Company");

class CompanyController {
  async index() {
    return Company.all();
  }
}

module.exports = CompanyController
