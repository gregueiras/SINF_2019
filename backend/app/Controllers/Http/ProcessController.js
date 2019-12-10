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
    const type = await ProcessType.find(process.process_type);
    const steps = await Step.query()
      .where({
        process_type_id: type.id,
        step_no: step
      })
      .first();

    return steps.active;
  }

  async nextStep({ request }) {
    const body = request.post();
    const { processID } = body;

    const process = await Process.find(processID);
    const type = await ProcessType.find(process.process_type);

    const currentStep = await Step.query()
      .where({
        process_type_id: type.id,
        active: true
      })
      .first();

    let nextStep;
    try {
      nextStep = await Step.query()
        .where({
          process_type_id: type.id,
          step_no: currentStep.step_no + 1
        })
        .firstOrFail();
    } catch (e) {
      nextStep = await Step.query()
        .where({
          process_type_id: type.id,
          step_no: 1
        })
        .firstOrFail();
    }

    currentStep.active = false;
    nextStep.active = true;

    await currentStep.save();
    await nextStep.save();

    return true;
  }
}

module.exports = ProcessController;
