const Factory = use('Factory')
const Database = use('Database')

class ActionSeeder {
  async run () {
    await Factory.model('App/Models/Action').createMany(4);
  }
}

module.exports = ActionSeeder