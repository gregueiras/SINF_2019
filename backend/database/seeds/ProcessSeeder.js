const Factory = use('Factory')
const Database = use('Database')

class ProcessSeeder {
  async run () {
    const processes = await Database.table('processes')
    console.log(processes)
  }
}

module.exports = CompanySeeder