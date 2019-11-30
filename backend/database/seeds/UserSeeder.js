const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    const users = await Database.table('users')
    console.log(users)
  }
}

module.exports = UserSeeder