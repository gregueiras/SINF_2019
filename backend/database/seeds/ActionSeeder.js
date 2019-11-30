const Factory = use('Factory')
const Database = use('Database')

class ActionSeeder {
  async run () {
    const actions = await Database.table('actions')
    console.log(actions)
  }
}

module.exports = ActionSeeder