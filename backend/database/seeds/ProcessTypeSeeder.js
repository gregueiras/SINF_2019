const Factory = use("Factory");
const Step = use("App/Models/Step");
const Database = use("Database");

class ProcessTypeSeeder {
  async run() {
    const t1 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for PurchaseOrder",
      type: "PO"
    });

    const a1 = await Factory.model("App/Models/Action").create({
      description: "Create SalesOrder",
      type: "SO"
    });

    const s1 = await Factory.model("App/Models/Step").make({
      step_no: 1,
      action_id: a1.id,
      trigger_id: t1.id,
      flow: "A->B"
    });

    const t2 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for seller payment",
      type: "PP"
    });

    const a2 = await Factory.model("App/Models/Action").create({
      description: "Create supplier receipt",
      type:"SR"
    });

    const s2 = await Factory.model("App/Models/Step").make({
      step_no: 2,
      action_id: a2.id,
      trigger_id: t2.id,
      flow: "A->B"
    });

    const a3 = await Factory.model("App/Models/Action").create({
      description: "Wait"
    });

    const s3 = await Factory.model("App/Models/Step").make({
      step_no: 3,
      action_id: a3.id,
      trigger_id: t2.id,
      flow: "A"
    });

    

    const pt1 = await Factory.model("App/Models/ProcessType").create({
      type: "Rent",
      descriptionA: "Renter",
      descriptionB: "Rentee"

    });
    
    pt1.steps().save(s1);
    pt1.steps().save(s2);
    pt1.steps().save(s3);

    const pt2 = await Factory.model("App/Models/ProcessType").create({
      type: "Goods",
      descriptionA: "Supplier",
      descriptionB: "Client"
    });
    pt2.steps().save(s1);
    pt2.steps().save(s2);
    
  }
}

module.exports = ProcessTypeSeeder;
