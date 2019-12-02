
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

