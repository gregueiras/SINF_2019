const Factory = use('Factory')
const Database = use('Database')

class CompanySeeder {
  async run () {
    await Factory.model('App/Models/Company').createMany(2);
  }
}

module.exports = CompanySeeder