"use strict";
import Queue from "../../../lib/Queue";
const User = use("App/Models/User");
const Process = use("App/Models/Process");
const ProcessType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");
const Trigger = use("App/Models/Trigger");
const Action = use("App/Models/Action");
const Log = use("App/Models/Log");
const Database = use("Database");

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
    const { params } = request;
    const { id } = params;
    const processID = id;
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
    console.log(processType);
    let steps;
    try {
      steps = (
        await Step.query()
          .where({
            process_type_id: processType
          })
          .fetch()
      ).toJSON();
    } catch (e) {
      console.log(e);
    }
    const processExist = await Process.query()
      .where({
        user: 1,
        company_a: companyA,
        company_b: companyB,
        process_type: processType
      })
      .getCount();

    if (true) {
      const getProcessType = await ProcessType.findOrFail(processType);
      let processTypeJob = "IC" + getProcessType.type.charAt(0) + "1";
      const lastProcessId = await Process.last();
      console.log("last process 2 " + JSON.stringify(lastProcessId));
     /* if (lastProcessId === null) processTypeJob += "" + 0;
      else processTypeJob += "" + lastProcessId.id;*/

      console.log(companyA);
      console.log(companyB);
      const process = new Process();
      process.process_type = processType;
      process.company_a = companyA;
      process.company_b = companyB;
      process.series = processTypeJob;
      process.user = 1;
      process.created_at = Database.fn.now();
      process.updated_at = Database.fn.now();
      process.series = processTypeJob;
      await process.save();
      
      /*const log = new Log();
      log.state = "Pending";
      log.description = getProcessType.type;
      log.date = process.created_at;
      log.process_id = process.id;
      log.created_at = Database.fn.now();
      log.updated_at = Database.fn.now();
      await log.save();*/

      console.log("serie " + process.series);
      for (const step of steps) {
        const trigger = await Trigger.find(step.trigger_id);
        const action = await Action.find(step.action_id);
        const triggerType = trigger.type;
        const actionType = action.type;
        const job = triggerType + "_" + actionType;
        const jobName = job + "_" + process.id;
        console.log("job " + job);
        await Queue.add(
          job,
          { companyA, companyB, processID: process.id, step: step.step_no },
          jobName
        );
      }

      return true;
    } else return false;
  }
}

module.exports = ProcessController;
