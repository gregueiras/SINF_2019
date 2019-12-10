"use strict";

const User = use("App/Models/User");
const Process = use("App/Models/Process");
const ProcessType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");

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
}

module.exports = ProcessController;
