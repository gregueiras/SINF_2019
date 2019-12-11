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

const Factory = use("Factory");

Factory.blueprint("App/Models/User", faker => {
  return {
    username: faker.username(),
    email: faker.username() + "@gmail.com",
    password: "12345"
  };
});

Factory.blueprint("App/Models/Company", (faker, i, data) => {
  return data;
});

Factory.blueprint("App/Models/Product", (faker, i, data) => {
  return {
    id_company_a: data.idCompanyA,
    id_company_b: data.idCompanyB,
    company_a: data.companyA,
    company_b: data.companyB
  };
});

Factory.blueprint("App/Models/ProcessType", (faker, i, { type, descriptionA, descriptionB }) => {
  return {
    user: "1",
    type,
    descriptionA,
    descriptionB
  };
});

Factory.blueprint("App/Models/Process", (faker, i, data) => {
  return {
    company_a: data.companyA,
    user: data.user,
    process_type: data.proc_type,
    company_b: data.companyB
  };
});

Factory.blueprint("App/Models/Trigger", (faker, i, {description}) => {
  return {
    description
  };
});

Factory.blueprint("App/Models/Action", (faker, i, {description}) => {
  return {
    description
  };
});

Factory.blueprint("App/Models/Log", (faker, i, data) => {
  let enu = ["Completed", "Pending", "In Progress", "Failed"];
  let type = enu[Math.floor(Math.random() * 4)];
  return {
    description: faker.sentence({ words: 10 }),
    date: faker.date(),
    process_id: "1",
    state: type
  };
});

Factory.blueprint(
  "App/Models/Step",
  (faker, i, { step_no, action_id, trigger_id, flow}) => {
    return {
      step_no,
      action_id,
      trigger_id,
      flow
    };
  }
);
