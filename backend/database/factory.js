
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
   return {
     username: faker.username(),
     email: faker.username()+'@gmail.com',
     password: '12345'
   }
 })

 Factory.blueprint('App/Models/Company', (faker, i, data) => {
    return {
      name: data.name
    }
  })

  Factory.blueprint('App/Models/Product', (faker, i, data) => {
    return {
      id_company_a : data.idCompanyA,
      id_company_b: data.idCompanyB,
      company_a: data.companyA,
      company_b: data.companyB,
    }
  })

  Factory.blueprint('App/Models/ProcessType', (faker, i, data) => {
    return {
      user: '1',
      type: faker.animal(),
    }
  })

  Factory.blueprint('App/Models/Process', (faker, i, data) =>{
    
    return {
      company_a: data.companyA,
      user: data.user,
      process_type: data.proc_type,
      company_b: data.companyB,
    }
  })

  Factory.blueprint('App/Models/Log', (faker, i , data) =>{
    let enu = ['Completed','Pending','In Progress','Failed'];
    let type = enu[Math.floor(Math.random()*4)];
    return {
      description: faker.sentence({ words: 10 }),
      date: faker.date(),
      process_id: '1',
      state: type,
    }
  })
