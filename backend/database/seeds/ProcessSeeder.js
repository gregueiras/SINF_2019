const Factory = use('Factory')
const Database = use('Database')

class ProcessSeeder {
  async run() {
    await Factory.model('App/Models/Process').create(
      {
        companyA: 1, // intercompany
        companyB: 3, //ritaNorinho
        user: 1,
        proc_type: 2
       
      });
    await Factory.model('App/Models/Process').create({
      companyA: 1, // intercompany
      companyB: 2, //feup
      user: 2,
      proc_type: 1
     
    });
  }
}

module.exports = ProcessSeeder