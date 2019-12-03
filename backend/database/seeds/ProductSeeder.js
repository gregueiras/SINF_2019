const Factory = use('Factory')
const Database = use('Database')

class ProductSeeder {
  async run () {
   await Factory.model('App/Models/Product').create({
    companyA: 1, // intercompany
    companyB: 3, //ritaNorinho
    idCompanyA: '250526',
    idCompanyB: '213445',
   });
   await Factory.model('App/Models/Product').create({
    companyA: 1, // intercompany
    companyB: 2, //feup
    idCompanyA: '250526',
    idCompanyB: '125675',
   });
  
  }
}

module.exports = ProductSeeder