const Factory = use("Factory");
const Step = use("App/Models/Step");
const Database = use("Database");

class ProcessTypeSeeder {
  async run() {


    const t6 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for Delivery Order",
      type: "SG"
    });

    const a6 = await Factory.model("App/Models/Action").create({
      description: "Create Goods Receipt",
      type: "RG",
      trigger_id: 1
    });

    //step1

    const t1 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for PurchaseOrder",
      type: "PO"
    });

    const a1 = await Factory.model("App/Models/Action").create({
      description: "Create SalesOrder",
      type: "SO",
      trigger_id: 1
    });

    const s1 = await Factory.model("App/Models/Step").make({
      step_no: 1,
      action_id: a1.id,
      trigger_id: t1.id,
      flow: "A->B"
    });

    const s11 = await Factory.model("App/Models/Step").make({
      step_no: 1,
      action_id: a1.id,
      trigger_id: t1.id,
      flow: "A->B"
    });

    //step2

    const t2 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for sales invoice",
      type: "SI"
    });

    const a2 = await Factory.model("App/Models/Action").create({
      description: "Create purchases invoice",
      type:"PI",
      trigger_id: 2
    });

    const s2 = await Factory.model("App/Models/Step").make({
      step_no: 2,
      action_id: a2.id,
      trigger_id: t2.id,
      flow: "B->A"
    });


    const s22 = await Factory.model("App/Models/Step").make({
      step_no: 2,
      action_id: a2.id,
      trigger_id: t2.id,
      flow: "B->A"
    });

    //step3

    const t3 = await Factory.model("App/Models/Trigger").create({
      description: "Wait for seller payment",
      type: "PP"
    });

    const a3 = await Factory.model("App/Models/Action").create({
      description: "Create supplier receipt",
      type:"SR",
      trigger_id: 3
    });

    const s3 = await Factory.model("App/Models/Step").make({
      step_no: 3,
      action_id: a3.id,
      trigger_id: t3.id,
      flow: "A->B"
    });

    //step 4
    const a4 = await Factory.model("App/Models/Action").create({
      description: "Wait",
      trigger_id: 0
    });

    const s4 = await Factory.model("App/Models/Step").make({
      step_no: 4,
      action_id: a4.id,
      trigger_id: t3.id,
      flow: "A"
    });

    // step 
    const s31 = await Factory.model("App/Models/Step").make({
      step_no: 3,
      action_id: a6.id,
      trigger_id: t6.id,
      flow: "B->A"
    });

    // step

    const s41 = await Factory.model("App/Models/Step").make({
      step_no: 4,
      action_id: a3.id,
      trigger_id: t3.id,
      flow: "A->B"
    });

    const pt1 = await Factory.model("App/Models/ProcessType").create({
      type: "Rent",
      descriptionA: "Renter",
      descriptionB: "Rentee"

    });
    
    pt1.steps().save(s11);
    pt1.steps().save(s22);
    pt1.steps().save(s3);

    const pt2 = await Factory.model("App/Models/ProcessType").create({
      type: "Goods",
      descriptionA: "Supplier",
      descriptionB: "Client"
    });
    pt2.steps().save(s1);
    pt2.steps().save(s2);
    pt2.steps().save(s31);
    pt2.steps().save(s41);
    
  }
}

module.exports = ProcessTypeSeeder;
