const Factory = use('Factory')

class TriggerSeeder {
  async run () {
    await Factory.model('App/Models/Trigger').createMany(4);
  }
}

module.exports = TriggerSeeder