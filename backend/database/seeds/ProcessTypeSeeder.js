const Factory = use("Factory");
const Step = use("App/Models/Step");
const Database = use("Database");

class ProcessTypeSeeder {
  async run() {
    const t1 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for PurchaseOrder"
    });

    const a1 = await Factory.model("App/Models/Action").create({
      description: "Create SalesOrder"
    });

    const s1 = await Factory.model("App/Models/Step").make({
      step_no: 1,
      action_id: a1.id,
      trigger_id: t1.id,
    });

    const t2 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for seller receipt"
    });

    const a2 = await Factory.model("App/Models/Action").create({
      description: "Create supplier receipt"
    });

    const s2 = await Factory.model("App/Models/Step").make({
      step_no: 2,
      action_id: a2.id,
      trigger_id: t2.id,
    });

    const pt1 = await Factory.model("App/Models/ProcessType").create({
      type: "Rent"
    });
    
    pt1.steps().save(s1);
    pt1.steps().save(s2);

    const pt2 = await Factory.model("App/Models/ProcessType").create({
      type: "Goods"
    });
    //pt2.steps().save(s1);
  }
}

module.exports = ProcessTypeSeeder;
