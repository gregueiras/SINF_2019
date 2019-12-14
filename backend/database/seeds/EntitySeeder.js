const Factory = use('Factory')
const Database = use('Database')

class EntitySeeder {
  async run () {
   await Factory.model('App/Models/Entity').create({
    companyA: 1, // intercompany
    companyB: 2, //feup
    idCompanyA: '0007',
    idCompanyB: '0001',
   });  
  }
}

module.exports = EntitySeeder