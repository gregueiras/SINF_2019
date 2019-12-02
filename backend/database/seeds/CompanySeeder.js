const Factory = use('Factory')
const Database = use('Database')

class CompanySeeder {
  async run () {
    await Factory.model('App/Models/Company').create({name: 'intercompany'});
    await Factory.model('App/Models/Company').create({name: 'feup'});
    await Factory.model('App/Models/Company').create({name: 'ritaNorinho'});
  }
}

module.exports = CompanySeeder