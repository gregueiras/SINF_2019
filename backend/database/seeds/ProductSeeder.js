const Factory = use('Factory')
const Database = use('Database')

class ProductSeeder {
  async run () {
   await Factory.model('App/Models/Product').create({
    companyA: 1, // intercompany
    companyB: 3, //ritaNorinho
    idCompanyA: 'IHA250526',
    idCompanyB: 'ZAMIOCULCA',
   });
   await Factory.model('App/Models/Product').create({
    companyA: 1, // intercompany
    companyB: 2, //feup
    idCompanyA: 'PORTES',
    idCompanyB: 'PORTES',
   });
   await Factory.model("App/Models/Product").create({
     companyA: 1, // intercompany
     companyB: 2, //feup
     idCompanyA: "IHA250526",
     idCompanyB: "TAP1"
   });
  
  }
}

module.exports = ProductSeeder