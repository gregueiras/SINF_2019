const Factory = use('Factory')
const Database = use('Database')

class ProcessSeeder {
  async run() {
    const p1 = await Factory.model('App/Models/Process').create(
      {
        companyA: 1, // intercompany
        companyB: 3, //ritaNorinho
        user: 1,
        proc_type: 2,
        series: "ICG1",
      });
    const p2 = await Factory.model('App/Models/Process').create({
      companyA: 1, // intercompany
      companyB: 2, //feup
      user: 2,
      proc_type: 1,
      series: "ICR1",
    });

   /* for (let index = 0; index < 5; index++) {
      const log1 = await Factory.model('App/Models/Log').create({ processID: 1 });
      const log2 = await Factory.model('App/Models/Log').create({ processID: 2 });
      
      p1.logs().save(log1);
      p2.logs().save(log2);
    }*/

  }
}

module.exports = ProcessSeeder