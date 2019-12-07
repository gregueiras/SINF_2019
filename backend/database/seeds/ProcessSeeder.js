const Factory = use('Factory')
const Database = use('Database')

class ProcessSeeder {
  async run() {
    const p1 = await Factory.model('App/Models/Process').create(
      {
        companyA: 1, // intercompany
        companyB: 3, //ritaNorinho
        user: 1,
        proc_type: 2
       
      });
    const p2 = await Factory.model('App/Models/Process').create({
      companyA: 1, // intercompany
      companyB: 2, //feup
      user: 2,
      proc_type: 1
     
    });

    const logs1 = await Factory.model("App/Models/Log").makeMany(5);
    const logs2 = await Factory.model("App/Models/Log").makeMany(5);

   // p1.logs().save(logs1);
   // p2.logs().save(logs2);

  }
}

module.exports = ProcessSeeder