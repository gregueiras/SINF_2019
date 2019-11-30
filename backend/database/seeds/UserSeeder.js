const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
   await Factory.model('App/Models/User').createMany(4);
  
  
  }
}

module.exports = UserSeeder