const Factory = use('Factory')

class UserSeeder {
  async run () {
   await Factory.model('App/Models/User').createMany(4);
  
  
  }
}

module.exports = UserSeeder