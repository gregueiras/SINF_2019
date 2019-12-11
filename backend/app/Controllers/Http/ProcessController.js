"use strict";

const User = use("App/Models/User");
const Process = use("App/Models/Process");
const ProcessType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");
const Trigger = use("App/Models/Trigger");
const Action = use("App/Models/Action");
import Queue from "../../../lib/Queue";
const Database = use('Database');

class ProcessController {
  async store({ request }) {
    const body = request.post();
    const { description, userID, companyA, companyB, processTypeID } = body;

    const user = await User.find(userID);
    const processType = await ProcessType.find(processTypeID);

    const process = new Process();

    process.description = description;
    process.company_a = companyA;
    process.company_b = companyB;
    process.user().associate(user);
    process.type().associate(processType);

    return await process.save();
  }

  async get({ request }) {
    const body = request.post();
    const { processID } = body;

    return await Process.find(processID);
  }

  async getSeries({ request }) {
    const body = request.post();
    const { processID } = body;

    const process = await Process.find(processID);

    return process.series;
  }

  async canRun({ request }) {
    const body = request.post();
    const { processID, step } = body;

    const process = await Process.find(processID);

    return process.active_step === step;
  }

  async nextStep({ request }) {
    const body = request.post();
    const { processID } = body;

    const process = await Process.find(processID);
    const type = await ProcessType.find(process.process_type);

    const activeStep = process.active_step;
    const steps = await Step.query()
      .where({
        process_type_id: type.id
      })
      .getCount();

    let nextStep = activeStep + 1;
    if (nextStep > steps) {
      nextStep = 1;
    }

    process.active_step = nextStep;

    process.save();

    return process.active_step;
  }
  async addProcess({ request }) {
    const body = request.post();
    const { processType, companyA, companyB } = body.data;
    console.log("process type " + processType);
    let steps;
    try {
     steps = (await Step.query()
      .where({
        process_type_id: processType
      }).fetch()).toJSON();
    } catch(e){
      console.log(e);
    }
    const processExist = (await Process
                          .query({user: 1, company_a: companyA, company_b: companyB, process_type: processType})
                          .fetch()).toJSON();
    console.log("process exist "+processExist);
    if (processExist.length == 0){
    

    const process = new Process();
    process.process_type = processType;
    process.company_a = companyA;
    process.company_b = companyB;
    process.created_at = Database.fn.now(),
    process.updated_at = Database.fn.now()
    process.user = 1;
    await process.save();
    
    console.log(process.id);
    for (const step of steps) {

      const trigger = await Trigger.find(step.trigger_id);
      const action = await Action.find(step.action_id);
      const triggerType = trigger.type;
      const actionType = action.type;
      const job = triggerType + "_" + actionType;
      const jobName = job+"_"+process.id;
      console.log("job "+job);
      await Queue.add(job, { companyA, companyB, processID: process.id, step: step.step_no }, jobName);
    }
    return true;
  } else return false;
  }
 
}

module.exports = ProcessController;
