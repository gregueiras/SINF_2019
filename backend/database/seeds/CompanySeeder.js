const Factory = use("Factory");
const Database = use("Database");

class CompanySeeder {
  async run() {
    await Factory.model("App/Models/Company").create({
      name: 'intercompany',
      tenant: "224900",
      organization: "224900-0001",
      clientId: "FEUP-SINF",
      clientSecret: "92f0a4da-64ee-4449-99e4-f93df1038980"
    });
    await Factory.model("App/Models/Company").create({
      name: "feup",
      tenant: "226890",
      organization: "226890-0001",
      clientId: "FEUP-SINF-2",
      clientSecret: "fb3887ba-6189-43dc-8e97-0ea104c575ec"
    });
    await Factory.model("App/Models/Company").create({
      name: "ritaNorinho",
      tenant: "226459",
      organization: "226459-0001",
      clientId: "FEUP-SINF",
      clientSecret: "92f0a4da-64ee-4449-99e4-f93df1038980"
    });
  }
}
module.exports = CompanySeeder;
