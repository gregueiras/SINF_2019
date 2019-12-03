const Factory = use('Factory')
const Database = use('Database')

class TriggerSeeder {
  async run () {
    const process_types = await Database.table('process_types')
    console.log(process_types)
  }
}

module.exports = TriggerSeeder