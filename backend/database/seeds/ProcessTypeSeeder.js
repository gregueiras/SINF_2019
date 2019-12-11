const Factory = use('Factory')
const Database = use('Database')

class ProcessTypeSeeder {
  async run () {
   await Factory.model('App/Models/ProcessType').createMany(2);
  }
}

module.exports = ProcessTypeSeeder