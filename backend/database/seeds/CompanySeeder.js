const Factory = use('Factory')
const Database = use('Database')

class CompanySeeder {
  async run () {
    const companies = await Database.table('companies')
    console.log(companies)
  }
}

module.exports = CompanySeeder